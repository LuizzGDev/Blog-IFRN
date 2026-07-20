// Ajustar esse numero se a API tiver rodando em outra porta
const API_URL = 'http://localhost:8080/api';

let postEditandoId = null;
let postAbertoId   = null;


function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
    window.scrollTo(0, 0);
}

function irParaLista() {
    postEditandoId = null;
    mostrarTela('tela-lista');
    exibirPosts();
}

function irParaFormulario() {
    postEditandoId = null;
    document.getElementById('form-titulo-header').textContent = 'Novo post';
    document.getElementById('titulo').value    = '';
    document.getElementById('descricao').value = '';
    document.getElementById('conteudo').value  = '';
    document.getElementById('autor').value     = '';
    mostrarTela('tela-formulario');
}


//POSTS

async function exibirPosts() {
    const container = document.getElementById('lista-posts');
    container.innerHTML = '<div class="empty-state">Carregando publicações...</div>';

    try {
        const resposta = await fetch(`${API_URL}/posts`);
        if (!resposta.ok) throw new Error('Falha ao buscar posts');
        const posts = await resposta.json();

        if (posts.length === 0) {
            container.innerHTML = '<div class="empty-state">Nenhum post ainda. Crie o primeiro!</div>';
            return;
        }

        container.innerHTML = posts.map(post => `
            <div class="post-card">
                <h3 class="card-title">${post.titulo}</h3>
                <p class="card-excerpt">${post.descricao ?? ''}</p>
                <div class="card-meta">
                    <span>${post.autor ?? ''}</span>
                    <span>${formatarData(post.dataPost)}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn ver" onclick="abrirPost(${post.id})">Ver</button>
                    <button class="action-btn" onclick="editarPost(${post.id})">Editar</button>
                    <button class="action-btn del" onclick="deletarPost(${post.id})">Excluir</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error(erro);
        container.innerHTML = '<div class="empty-state">Não foi possível conectar à API. Verifique se o back-end está rodando em ' + API_URL + '.</div>';
    }
}

async function salvarPost() {
    const titulo    = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const autor     = document.getElementById('autor').value.trim();
    const conteudo  = document.getElementById('conteudo').value.trim();

    if (!titulo || !descricao || !autor || !conteudo) {
        mostrarToast('Preencha todos os campos.');
        return;
    }

    const corpo = { titulo, descricao, autor, conteudo };

    try {
        let resposta;
        if (postEditandoId) {
            resposta = await fetch(`${API_URL}/posts/${postEditandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpo)
            });
        } else {
            resposta = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpo)
            });
        }

        if (!resposta.ok) throw new Error('Falha ao salvar post');

        mostrarToast(postEditandoId ? 'Post atualizado!' : 'Post publicado!');
        postEditandoId = null;
        irParaLista();
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao salvar post. Verifique a API.');
    }
}

async function deletarPost(id) {
    if (!confirm('Excluir este post?')) return;

    try {
        const resposta = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error('Falha ao excluir post');
        mostrarToast('Post excluído.');
        exibirPosts();
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao excluir post.');
    }
}

async function editarPost(id) {
    try {
        const resposta = await fetch(`${API_URL}/posts/${id}`);
        if (!resposta.ok) throw new Error('Post não encontrado');
        const post = await resposta.json();

        document.getElementById('titulo').value    = post.titulo;
        document.getElementById('descricao').value = post.descricao ?? '';
        document.getElementById('conteudo').value  = post.conteudo ?? '';
        document.getElementById('autor').value     = post.autor ?? '';
        document.getElementById('form-titulo-header').textContent = 'Editar post';
        postEditandoId = id;
        mostrarTela('tela-formulario');
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao carregar post para edição.');
    }
}

async function abrirPost(id) {
    postAbertoId = id;

    try {
        const resposta = await fetch(`${API_URL}/posts/${id}`);
        if (!resposta.ok) throw new Error('Post não encontrado');
        const post = await resposta.json();

        const iniciais = (post.autor ?? '?')
            .split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        document.getElementById('detalhe-conteudo').innerHTML = `
            <h1 class="post-title">${post.titulo}</h1>
            <div class="post-meta-row">
                <div class="author-avatar">${iniciais}</div>
                <div class="post-meta-text"><strong>${post.autor ?? ''}</strong> · ${formatarData(post.dataPost)}</div>
            </div>
            <p class="post-desc">${post.descricao ?? ''}</p>
            <div class="post-body"><p>${post.conteudo ?? ''}</p></div>
        `;

        await carregarComentarios(id);
        mostrarTela('tela-detalhe');
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao abrir post.');
    }
}


//COMENTÁRIOS

async function carregarComentarios(idPost) {
    try {
        const resposta = await fetch(`${API_URL}/posts/${idPost}/comentarios`);
        if (!resposta.ok) throw new Error('Falha ao buscar comentários');
        const comentarios = await resposta.json();
        renderizarComentarios(comentarios);
    } catch (erro) {
        console.error(erro);
        document.getElementById('lista-comentarios').innerHTML =
            '<div class="empty-state">Não foi possível carregar os comentários.</div>';
    }
}

async function adicionarComentario() {
    const nome     = document.getElementById('comentario-nome').value.trim();
    const conteudo = document.getElementById('comentario-texto').value.trim();

    if (!nome || !conteudo) {
        mostrarToast('Preencha nome e comentário!');
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/posts/${postAbertoId}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, texto: conteudo })
        });
        if (!resposta.ok) throw new Error('Falha ao comentar');

        document.getElementById('comentario-nome').value  = '';
        document.getElementById('comentario-texto').value = '';
        await carregarComentarios(postAbertoId);
        mostrarToast('Comentário publicado!');
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao publicar comentário.');
    }
}

function renderizarComentarios(comentarios) {
    const container = document.getElementById('lista-comentarios');
    const titulo    = document.getElementById('comments-titulo');
    titulo.textContent = comentarios.length > 0
        ? `${comentarios.length} Comentário${comentarios.length > 1 ? 's' : ''}`
        : 'Comentários';

    if (comentarios.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum comentário ainda. Seja o primeiro!</div>';
        return;
    }

    container.innerHTML = comentarios.map(c => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-author">${c.nome}</span>
                <div style="display:flex;align-items:center;gap:12px;">
                    <span class="comment-date">${formatarData(c.dataComentario)}</span>
                    <button class="comment-del" onclick="deletarComentario(${c.id})">excluir</button>
                </div>
            </div>
            <p class="comment-text">${c.texto}</p>
        </div>
    `).join('');
}

async function deletarComentario(id) {
    try {
        const resposta = await fetch(`${API_URL}/comentarios/${id}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error('Falha ao excluir comentário');
        await carregarComentarios(postAbertoId);
    } catch (erro) {
        console.error(erro);
        mostrarToast('Erro ao excluir comentário.');
    }
}


//UTILITÁRIO

function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    const dataObj = new Date(ano, mes - 1, dia);
    return dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
}

function mostrarToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

exibirPosts();

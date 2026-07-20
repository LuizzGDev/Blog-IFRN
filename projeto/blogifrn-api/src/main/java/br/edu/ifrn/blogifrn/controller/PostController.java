package br.edu.ifrn.blogifrn.controller;

import br.edu.ifrn.blogifrn.model.Post;
import br.edu.ifrn.blogifrn.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    //lista todos os posts (mais recentes primeiro)
    @GetMapping
    public List<Post> listar() {
        List<Post> posts = postRepository.findAll();
        posts.sort((a, b) -> b.getId().compareTo(a.getId()));
        return posts;
    }

    //busca um post especifico
    @GetMapping("/{id}")
    public ResponseEntity<Post> buscarPorId(@PathVariable Long id) {
        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //cria um novo post
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post criar(@RequestBody Post post) {
        post.setId(null);
        return postRepository.save(post);
    }

    //atualiza um post existente
    @PutMapping("/{id}")
    public ResponseEntity<Post> atualizar(@PathVariable Long id, @RequestBody Post dadosNovos) {
        return postRepository.findById(id)
                .map(postExistente -> {
                    postExistente.setTitulo(dadosNovos.getTitulo());
                    postExistente.setDescricao(dadosNovos.getDescricao());
                    postExistente.setConteudo(dadosNovos.getConteudo());
                    postExistente.setAutor(dadosNovos.getAutor());
                    Post atualizado = postRepository.save(postExistente);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //remove um post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

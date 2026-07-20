package br.edu.ifrn.blogifrn.controller;

import br.edu.ifrn.blogifrn.model.Comentario;
import br.edu.ifrn.blogifrn.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComentarioController {

    @Autowired
    private ComentarioRepository comentarioRepository;

    //lista os comentarios de um post
    @GetMapping("/api/posts/{postId}/comentarios")
    public List<Comentario> listarPorPost(@PathVariable Long postId) {
        return comentarioRepository.findByIdPostOrderByIdAsc(postId);
    }

    //cria um comentario em um post
    @PostMapping("/api/posts/{postId}/comentarios")
    @ResponseStatus(HttpStatus.CREATED)
    public Comentario criar(@PathVariable Long postId, @RequestBody Comentario comentario) {
        comentario.setId(null);
        comentario.setIdPost(postId);
        return comentarioRepository.save(comentario);
    }

    //remove um comentario
    @DeleteMapping("/api/comentarios/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!comentarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        comentarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

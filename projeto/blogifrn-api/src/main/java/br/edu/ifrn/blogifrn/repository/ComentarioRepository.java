package br.edu.ifrn.blogifrn.repository;

import br.edu.ifrn.blogifrn.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByIdPostOrderByIdAsc(Long idPost);
}

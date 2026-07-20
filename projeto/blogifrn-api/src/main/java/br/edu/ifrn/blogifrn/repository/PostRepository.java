package br.edu.ifrn.blogifrn.repository;

import br.edu.ifrn.blogifrn.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}

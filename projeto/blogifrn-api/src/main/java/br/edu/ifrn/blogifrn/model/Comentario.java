package br.edu.ifrn.blogifrn.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comentario")
    private Long id;

    @Column(name = "id_post", nullable = false)
    private Long idPost;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "texto", length = 200)
    private String texto;

    @Column(name = "data_comentario")
    private LocalDate dataComentario;

    public Comentario() {
    }

    @PrePersist
    public void prePersist() {
        if (dataComentario == null) {
            dataComentario = LocalDate.now();
        }
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDate getDataComentario() {
        return dataComentario;
    }

    public void setDataComentario(LocalDate dataComentario) {
        this.dataComentario = dataComentario;
    }
}

import React, { useState, useEffect } from "react";
import { LayoutAdmin } from "./LayoutAdmin";
import Swal from "sweetalert2";
import styles from "./components/styles/InicioAdmin.module.css";
import axios from "axios";

type Post = {
  id: number;
  titulo: string;
  contenido: string;
};

const InicioAdmin = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ titulo: "", contenido: "" });
  const [search, setSearch] = useState("");

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/posts");
    setPosts(response.data);
    setFilteredPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPost = async () => {
    try {
      await axios.post("http://localhost:3000/posts", newPost);
      await getPosts();
      setNewPost({ titulo: "", contenido: "" });
      Swal.fire("¡Agregado!", "Publicación creada exitosamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la publicación", "error");
    }
  };

  const handleEditPost = async () => {
    if (editPost) {
      try {
        await axios.put(`http://localhost:3000/posts/${editPost.id}`, editPost);
        await getPosts();
        setEditPost(null);
        Swal.fire(
          "¡Actualizado!",
          "Publicación editada exitosamente",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar la publicación", "error");
      }
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      await getPosts();
      Swal.fire("¡Eliminado!", "Publicación eliminada exitosamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la publicación", "error");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm) {
      const filtered = posts.filter((post) =>
        post.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <LayoutAdmin>
      <input
        type="text"
        name="search"
        placeholder="Buscar publicación"
        value={search}
        onChange={handleSearch}
        className={styles.input}
      />

      <h1 className={styles.titulo}>Crear publicación</h1>

      <div className={styles.newPostContainer}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={newPost.titulo}
          onChange={handleInputChange}
          className={styles.input}
        />
        <textarea
          name="contenido"
          placeholder="Contenido"
          value={newPost.contenido}
          onChange={handleInputChange}
          className={styles.textarea}
        />
        <button onClick={handleAddPost} className={styles.button}>
          Agregar Publicación
        </button>
      </div>

      <div className={styles.postsContainer}>
        {filteredPosts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            {editPost?.id === post.id ? (
              <>
                <input
                  type="text"
                  value={editPost.titulo}
                  onChange={(e) =>
                    setEditPost((prev) => ({
                      ...prev!,
                      titulo: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
                <textarea
                  value={editPost.contenido}
                  onChange={(e) =>
                    setEditPost((prev) => ({
                      ...prev!,
                      contenido: e.target.value,
                    }))
                  }
                  className={styles.textarea}
                />
                <button onClick={handleEditPost} className={styles.button}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.postTitle}>{post.titulo}</h3>
                <p className={styles.postContent}>{post.contenido}</p>
                <div className={styles.actions}>
                  <button
                    onClick={() => setEditPost(post)}
                    className={styles.button}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </LayoutAdmin>
  );
};

export default InicioAdmin;

import { useState, useEffect } from "react";
import styles from "./components/styles/InicioAdmin.module.css";
import axios from "axios";
import { LayoutEmpleado } from "./LayoutEmpleado";

type Post = {
  id: number;
  titulo: string;
  contenido: string;
};

const InicioEmployee = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/posts");
    setPosts(response.data);
    setFilteredPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = posts.filter(
      (post) =>
        post.titulo.toLowerCase().includes(value.toLowerCase()) ||
        post.contenido.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <LayoutEmpleado>
      <h1 className={styles.titulo}>Publicaciones</h1>

      <input
        type="text"
        placeholder="Buscar por título o contenido"
        value={search}
        onChange={handleSearch}
        className={styles.input}
      />

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h3 className={styles.postTitle}>{post.titulo}</h3>
            <p className={styles.postContent}>{post.contenido}</p>
          </div>
        ))
      ) : (
        <p className={styles.parrafo}>No hay publicaciones</p>
      )}
    </LayoutEmpleado>
  );
};

export default InicioEmployee;

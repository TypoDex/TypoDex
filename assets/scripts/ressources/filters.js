document.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/scripts/ressources/articles.json")
    .then((response) => response.json())
    .then((articles) => {
      const section = document.getElementById("articles");

      // Injecte les articles
      articles.forEach((article) => {
        const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const tagsHtml = article.tags.map((tag) => `<li>${tag}</li>`).join("");

        section.innerHTML += `
            <article>
              <time datetime="${article.date}">${formattedDate}</time>
              <h4><a href="#">${article.title}</a></h4>
              <span class="author">Écrit par <strong>${article.author}</strong></span>
              <p>${article.summary}</p>
              <ul class="tags" aria-label="Étiquettes">
                ${tagsHtml}
              </ul>
            </article>
          `;
      });

      // Après ajout des articles : créer les filtres
      const filtersContainer = document.getElementById("filters");
      const tagsSet = new Set();

      // Collecte tous les tags uniques
      articles.forEach((article) => {
        article.tags.forEach((tag) => tagsSet.add(tag.toLowerCase()));
      });

      // Créer un bouton pour chaque tag trouvé
      Array.from(tagsSet)
        .sort()
        .forEach((tag) => {
          const btn = document.createElement("button");
          btn.textContent = tag;
          btn.dataset.filter = tag;
          filtersContainer.appendChild(btn);
        });

      // Gestion des filtres multiples toggleables
      const articlesElements = document.querySelectorAll("section article");

      filtersContainer.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          button.classList.toggle("active");

          // Récupère tous les filtres actifs
          const activeFilters = Array.from(filtersContainer.querySelectorAll("button.active")).map((btn) => btn.dataset.filter);

          articlesElements.forEach((article) => {
            const articleTags = Array.from(article.querySelectorAll("li")).map((li) => li.textContent.toLowerCase().trim());

            // Affiche si au moins un tag correspond à un filtre actif, ou si aucun filtre n'est actif
            if (activeFilters.length === 0 || articleTags.some((tag) => activeFilters.includes(tag))) {
              article.style.display = "";
            } else {
              article.style.display = "none";
            }
          });
        });
      });

      if (typeof window.checkScroll === "function") {
        window.checkScroll();
      }
    })

    .catch((error) => console.error("Erreur lors du chargement des articles :", error));
});

const articlesPerPage = 5;
let currentPage = 1;
let allArticles = [];

const loadArticle = async () => {
    try {
        const response = await fetch("http://localhost:8080/article");
        let data = await response.json();

        // Pastikan data berbentuk array
        if (!Array.isArray(data)) {
            data = [data];
        }

        console.log("Fetched data:", data); // Debugging log

        // Pastikan Status memiliki huruf yang sesuai
        allArticles = data.filter(article => String(article.Status).toLowerCase() === "publish");

        renderArticles();
    } catch (error) {
        Swal.fire("Error!", "Failed to fetch articles.", "error");
        console.error("Fetch error:", error);
    }
}

const renderArticles = () => {
    const articleList = document.getElementById("article-list");
    articleList.innerHTML = "";

    if (allArticles.length === 0) {
        articleList.innerHTML = `<p class="text-center text-muted">Tidak ada artikel yang tersedia.</p>`;
        return;
    }

    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = allArticles.slice(start, end);

    paginatedArticles.forEach(article => {
        const articleCard = `
           <div class="col-md-6 mb-4">
                <div class="card shadow-sm h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${article.Title}</h5>
                        <p class="card-text flex-grow-1">${article.Content.substring(0, 100)}...</p>
                        <button class="btn btn-primary mt-auto" onclick='showArticleModal(${JSON.stringify(article)})'>Read More</button>
                    </div>
                </div>
            </div>
        `;
        articleList.innerHTML += articleCard;
    });

    generatePagination();
}

const generatePagination = () => {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(allArticles.length / articlesPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
}

const showArticleModal = (article) => {
    document.getElementById("articleModalLabel").innerText = article.Title;
    document.getElementById("articleModalContent").innerText = article.Content;

    const articleModal = new bootstrap.Modal(document.getElementById("articleModal"));
    articleModal.show();
}


document.addEventListener("DOMContentLoaded", () => {
    loadArticle();

    document.getElementById("pagination").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            currentPage = parseInt(event.target.getAttribute("data-page"));
            renderArticles();
        }
    });
});

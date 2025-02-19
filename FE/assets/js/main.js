const loadPosts = async () => {
    try {
        const response = await fetch("http://localhost:8080/article");
        let data = await response.json();

        if (!Array.isArray(data)) {
            data = [data];
        }

        await renderTables(data);
    } catch (error) {
        swall("Error fetching posts", "", "error");
        return [];
    }
};

const renderTables = async (posts) => {
    $("#publishedTable").empty();
    $("#draftTable").empty();
    $("#trashTable").empty();

    posts.forEach(post => {
        let deleteFunction = post.Status === "trash" ? "deletePost" : "moveTrash";

        let row = `
            <tr>
                <td>${post.Title}</td>  <!-- Perbaiki ini -->
                <td>${post.Category}</td> <!-- Perbaiki ini -->
                <td>
                    <button class="btn btn-primary btn-sm edit-btn" onclick="editPost(${post.ID})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-btn" onclick="${deleteFunction}(${post.ID})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    
        if (post.Status === "publish") {
            $("#publishedTable").append(row);
        } else if (post.Status === "draft") {
            $("#draftTable").append(row);
        } else if (post.Status === "trash") {
            $("#trashTable").append(row);
        }
    });
};

const editPost = async (id) => {
    window.location.href = `input.html?id=${id}`;
}

const moveTrash = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/article/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Status: "trash"
            })
        });

        if (response.status === 200) {
            await Swal.fire({
                title: "Moved to Trash!",
                text: "The post has been successfully moved to trash.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                loadPosts();
            });
        }
    } catch (error) {
        swall("Error moving post to trash", "", "error");
    }
};

const deletePost = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/article/${id}`, {
            method: "DELETE"
        });

        if (response.status === 200) {
            await Swal.fire({
                title: "Post Deleted!",
                text: "The post has been permanently deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                loadPosts();
            });
        }
    } catch (error) {
        swall("Error deleting post", "", "error");
    }
}

$(document).ready(async function () {
    await loadPosts();
});

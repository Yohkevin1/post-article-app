
const loadPostDetail = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/article/${id}`);
        const post = await response.json();

        $("#title").val(post.Title);
        $("#content").val(post.Content);
        $("#category").val(post.Category);
        $(`input[name='status'][value='${post.Status}']`).prop("checked", true);
    } catch (error) {
        Swal.fire("Error!", "An unexpected error occurred.", "error");
    }
}

$(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId) {
        await loadPostDetail(postId);
    }

    $("#addPostForm").submit(async function (event) {
        event.preventDefault();

        const postData = {
            Title: $("#title").val(),
            Content: $("#content").val(),
            Category: $("#category").val(),
            Status: $("input[name='status']:checked").val(),
        };

        try {
            let response;
            if (postId) {
                response = await fetch(`http://localhost:8080/article/${postId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
            } else {
                // Jika tidak ada ID, buat post baru
                response = await fetch("http://localhost:8080/article", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });
            }

            const responseData = await response.json();

            if (!response.ok) {
                let errorMessage = "Failed to save post.";
                if (responseData.errors) {
                    errorMessage = Object.values(responseData.errors)
                        .map(err => `• ${err}`)
                        .join("\n");
                }

                Swal.fire({
                    title: "Validation Error!",
                    text: errorMessage,
                    icon: "error",
                });

                return;
            }

            Swal.fire({
                title: "Success!",
                text: postId ? "Post has been updated successfully." : "Post has been added successfully.",
                icon: "success",
            }).then(() => {
                window.location.href = "index.html";
            });

        } catch (error) {
            Swal.fire("Error!", "An unexpected error occurred.", "error");
        }
    });
});

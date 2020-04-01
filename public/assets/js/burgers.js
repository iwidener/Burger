$(function () {

    $(".devour").on("click", function (event) {
        event.preventDefault();
        const id = $(this).data("id");
        const newDevourState = {
            devour: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(function () {
            console.log("Burger devoured!");
            location.reload();
        });
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        console.log($("#newbrgr"));
        const newBrgr = {
            burger_name: $("#newbrgr").val().trim(),
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBrgr
        }).then(function () {
            console.log("Burger submitted");
            location.reload();
        });
    });

    $(".remove").on("click", function (event) {
        console.log("delete");
        event.preventDefault();
        const id = $(this).data("id");
        $.ajax( "/api/burgers/" + id, {
            type: "DELETE",
        }).then(function () {
            console.log("deleted id", id);
            location.reload();
        });
    });
});

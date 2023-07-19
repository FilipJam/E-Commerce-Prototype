app.component('review-list', {
    props:{
        reviews:{
            required: true,
            type: Array
        }
    },
    template:
    /*html*/
    `
    <div class="review-container">
        <h3>Reviews</h3>
        <ul>
            <li v-for="review in reviews">
                {{review.name}} gave this {{review.rating}} stars
                <br />
                "{{review.review}}"
                <br />
                Recommended: {{ review.recommend }}
            </li>
        </ul>
    </div>
    `
})
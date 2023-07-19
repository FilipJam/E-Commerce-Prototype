app.component('product-display', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :class="{'out-of-stock-img': !inStock}" :src="image">
          </div>
          <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="onSale">{{saleText}}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            
            <!-- Code Challenge -->
            <product-details :details="details"></product-details>
            
            <div 
            class="color-circle"
            v-for="(variant, index) in variants" 
            @mouseover="updateVariant(index)"
            :style="{ backgroundColor: variant.color }"></div>
            
            <button 
              class="button" 
              @click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">Add to Cart</button>

            <button 
              class="button" 
              @click="removeFromCart">Remove Item</button>
          </div>
          
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
      data(){
        return{
            product: 'Sock',
            brand: 'Vue Mastery',
            onSale: true,
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 30}
            ],
            reviews: []
        }
    },
    methods:{
        updateVariant(index){
            this.selectedVariant = index
            console.log(index)
        },
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        saleText(){
            return this.brand + ' ' + this.product + ' is on Sale'
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return 2.99
        }
    }
})
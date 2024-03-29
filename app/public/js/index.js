// const Info = {
//     data(){
//         return{
//             "person":{
//                 name:{},
//                 picture:{},
//                 dob:{},
//                 location:{},
//             },
            
//         }
//     },
//     computed:{
//         prettyBirthday(){
//             return dayjs(this.person.dob.date).format('DD/MM/YYYY');
//         }
//     },
//     methods:{
//         fetchUserData(){
//             fetch('https://randomuser.me/api/')
//             .then( response => response.json())
//             .then((parsedJSON) =>{
//                 console.log(parsedJSON);
//                 this.person = parsedJSON.results[0]
//             })
//             .catch(  err => {
//                 console.error(err)
//             })
//         }
//     },
//     created(){
//         this.fetchUserData();
//     }
// }

// Vue.createApp(Info).mount('#infoApp')

const SomeApp = {
    data() {
      return {
        books: [],
        bookForm: {},
        selectedBook: null
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectStudent(s) {
            if (s == this.selectedStudent) {
                return;
            }
            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postBook(evt){
          if (this.selectedBook) {
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },  
        postNewBook(evt) {
            //this.bookForm.bookId = this.selectedBook.id;        
            console.log("Posting:", this.bookForm);
            // alert("Posting!");
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
              });
        },
        postEditBook(evt) {
          this.bookForm.id = this.selectedBook.id;        
          console.log("Editing:", this.bookForm);
          // alert("Posting!");
  
          fetch('api/books/update.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.handleResetBook();
            });
        },
        postDeleteBook(o) {   
            if ( !confirm("Are you sure you want to the book titled: " + o.title + " ?") ) {
                return;
            
            }
            
            console.log("DELETE:", o);
            
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.handleResetBook();
              });
          }, 
        handleEditBook(book){
            this.selectedBook = book;
            this.bookForm = Object.assign({},this.selectedBook);
        },  
        handleResetBook(){
            this.selectedBook = null;
            this.bookForm = {};
        }   
    },
    created() {
        this.fetchBookData();
        
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#bookApp');
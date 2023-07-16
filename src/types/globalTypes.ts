interface IReview {
    email : string;
    reviewText : string;
}

export interface IBook {
    _id : string
    title : string;
    author : string;
    genre : string;
    addedBy : string;
    publicationDate : string
    review : IReview[]
}

export interface ICredential {
    name : string
     email : string;
     password : string
 }
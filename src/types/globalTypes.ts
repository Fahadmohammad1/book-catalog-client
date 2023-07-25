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
    imageUrl : string
    review : IReview[]
}

export interface ICredential {
    name : string | null;
     email : string | null
     password? : string | null
 }
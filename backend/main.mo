import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Order "mo:base/Order";

actor {
    stable var posts : [Post] = [];

    type Post = {
        title: Text;
        author: Text;
        body: Text;
        timestamp: Time.Time;
    };

    public func addPost(title: Text, author: Text, body: Text) : async () {
        let newPost : Post = {
            title = title;
            author = author;
            body = body;
            timestamp = Time.now();
        };
        posts := Array.append(posts, [newPost]);
    };

    public query func getPosts() : async [Post] {
        return Array.sort(posts, func (a: Post, b: Post) : Order.Order {
            if (a.timestamp > b.timestamp) #less
            else if (a.timestamp < b.timestamp) #greater
            else #equal
        });
    };
}

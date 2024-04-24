# Noproata Api

## **Some Notes:**
```
1- token send in request headers with name "Authorization"
2- URL of the API "http://localhost:5000"
```

</br>

## **Auth Routes:**
### **Register** done
Route:
```
/auth/register 
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| firstName | text | not null | true |
| lastName | text | not null | true |
| email | text | valid email(achieve this pattern ".+\@.+\..+") | true |
| password | text | minimum length 5 | true |
| location | text |  | false |
| occupation | text |  | false |
| picture | file | must be image not any file | false |

Response Data:
- message: Success

- token: the JWT

- user: user data

<br/>

### **Login** done
Route:
```
/auth/login
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| email | text | valid email(achieve this pattern ".+\@.+\..+") | true |
| password | text | minimum length 5 | true |

Response Data:
- message: Success

- token: the JWT

- user: user data

<br/>

## **User Routes:**
### **Get User By Id**
Route:
```
/user/:userId
```
Method:
```
GET
```
Response Data:
- message: User Found

- user: user data

<br/>

### **Get All Users**
Route:
```
/user/all/:page
```
Method:
```
GET
```
Response Data:
- message: All Users

- users: users data

<br/>

### **Update User**
Route:
```
/user/
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| firstName | text | not null | false |
| lastName | text | not null | false |
| email | text | valid email(achieve this pattern ".+\@.+\..+") | false |
| password | text | minimum length 5 | false |
| location | text |  | false |
| occupation | text |  | false |
| picture | file | must be image not any file | false |
| skill | text |  | false |

Response Data:
- message: User Updated

- user: user data

<br/>

### **Delete Skill**
Route:
```
/user/deleteSkill
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| skill | text |  | false |

Response Data:
- message: Skill deleted

- user: user data

<br/>

### **Delete User**
Route:
```
/user/
```
Method:
```
DELETE
```
Response Data:
- message: User Deleted

<br/>

### **Update Password**
Route:
```
/user/password/update
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| oldPassword | text | not null | true |
| newPassword | text | not null | true |

Response Data:
- message: Password Updated

<br/>

### **Request To Reset**
Route:
```
/user/password/requestToReset
```
Method:
```
GET
```
Response Data:
- message: Code Sent

<br/>

### **Update Password**
Route:
```
/user/password/reset
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| code | text | not null | true |
| password | text | not null | true |

Response Data:
- message: Password Updated

<br/>

### **Get User Friends**
Route:
```
/user/:userId/friends/:page
```
Method:
```
GET
```
Response Data:
- message: All User Friends

- friends: user friends

<br/>

### **Add Or Remove Friendship** 
Route:
```
/user/:friendId/friends
```
Method:
```
PATCH
```
Response Data:
- message: done

- user: user data

<br/>

## **Post Routes:**
### **Get All Posts** done
Route:
```
/post/all/:page           - (page) => page number default = 1
```
Method:
```
GET
```
Response Data:
- message: All Posts

- posts: posts data

<br/>

### **Get User Posts**
Route:
```
/post/user_posts/:userId/:page           - (page) => page number default = 1
```
Method:
```
GET
```
Response Data:
- message: All Posts

- posts: posts data

<br/>

### **Get Tag Posts**
Route:
```
/post/tag_posts/:page           - (page) => page number default = 1
```
Method:
```
GET
Hint: you will send tags in request query
    ex: GET /endpoint?tags=value1&tags=value2&tags=value3
    this will arrive to me as array
```
Response Data:
- message: All Posts

- posts: posts data

<br/>

### **Get Post By Id**
Route:
```
/post/:postId
```
Method:
```
GET
```
Response Data:
- message: Post Found

- post: post data

<br/>

### **Save Post**
Route:
```
/post/save/:postId
```
Method:
```
GET
```
Response Data:
- message: Post Saved

<br/>

### **Unsave Post**
Route:
```
/post/save/:postId
```
Method:
```
DELETE
```
Response Data:
- message: Deleted Successfully

<br/>

### **Get Saved Posts**
Route:
```
/post/saved_posts/:page
```
Method:
```
GET
```
Response Data:
- message: All Saved Posts

- posts: posts data

- totalCount: total count of posts of this endpoint

<br/>

### **Add Post** done
Route:
```
/post/addPost
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| description | text |  | false |
| picturePost | file | multible images | false |
| tags | array |  | false |
| picturePost | file | multiple images | false |

Response Data:
- message: Added Successfully

- post: post data

<br/>

### **Update Post**  done
Route:
```
/post/:postId
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| description | text |  | false |
| picturePost | file | multible images | false |
| tags | array |  | false |
| picturePost | file | multiple images | false |

Response Data:
- message: Update Successfully

- post: post data

<br/>

### **Like Post** done
Route:
```
/post/:postId/like
```
Method:
```
PATCH
```
Response Data:
- message: Like Successfully

- post: post data

<br/>

### **Delete Post** done
Route:
```
/post/:postId
```
Method:
```
DELETE
```
Response Data:
- message: "Delete Successfully"

<br/>

### **Share Post**
Route:
```
/post/share/:postId
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| description | text |  | false |
| picturePost | file | multible images | false |
| tags | array |  | false |
| picturePost | file | multiple images | false |

Response Data:
- message: Added Successfully

- post: post data

<br/>

## **Comment Routes**
### **Get Post Comments**
Route:
```
/comment/post_comments/:postId/:page
```
Method:
```
GET
```
Response Data:
- message: All Comments

- comments: comments data

<br/>

### **Get Comment Replies**
Route:
```
/comment/replies/:commentId/:page
```
Method:
```
GET
```
Response Data:
- message: All Comments

- comments: comments data

<br/>

### **Get Comment By Id**
Route:
```
/comment/:commentId
```
Method:
```
GET
```
Response Data:
- message: Comment Found

- comment: comment data

<br/>

### **Add Comment On Post** done
Route:
```
/comment/onPost/:postId
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| comment | text |  | false |
| pictureComment | file | single image | false |

Response Data:
- message: Comment Successfully

- comment: comment data

<br/>

### **Add Comment On Comment**
Route:
```
/comment/onComment/:commentId
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| comment | text |  | false |
| pictureComment | file | single image | false |

Response Data:
- message: Comment Successfully

- comment: comment data

<br/>

### **Update Comment**
Route:
```
/comment/:commentId
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| comment | text |  | false |
| pictureComment | file | single image | false |

Response Data:
- message: Update Successfully

- comment: comment data

<br/>

### **Like Comment**
Route:
```
/comment/:commentId/like
```
Method:
```
PATCH
```
Response Data:
- message: Like Successfully

- comment: comment data

<br/>

### **Delete Comment** done
Route:
```
/comment/:commentId
```
Method:
```
DELETE
```
Response Data:
- message: Delete Successfully

## **Tag Routes**
### **Get All Tags**
Route:
```
/Tag/:page      - send in request query variable named "search" and set in it the sub string
```
Method:
```
GET
```
Response Data:
- message: All Tags

- tags: tags data

<br/>

### **Get Tag By Id**
Route:
```
/tag/:tagId
```
Method:
```
GET
```
Response Data:
- message: Tag Found

- tag: tag data

<br/>

### **Create Tag**
Route:
```
/tag/
```
Method:
```
POST
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| tag | text |  | true |
| description | text |  | false |

Response Data:
- message: Tag Created

- tag: tag data

<br/>


### **Update Tag**
Route:
```
/tag/:tagId
```
Method:
```
PATCH
```
Request:
| input name | Type | validate | required |
|--------|------|-------|--------|
| tag | text |  | false |
| description | file |  | false |

Response Data:
- message: Update Successfully

- tag: tag data

<br/>

### **Delete Tag**
Route:
```
/tag/:tagId
```
Method:
```
DELETE
```
Response Data:
- message: Delete Successfully

<br/>
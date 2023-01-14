const e = require("express");

function init() {

    // Users ----------------------------------------------------------------
    fetch('http://localhost:8080/api/users')
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Email: ${el.email}, Password: ${el.password}</li>`;
            })
        });

        document.getElementById('usrBtn').addEventListener('click', e =>{
            e.preventDefault();
            const data = {
                name: document.getElementById('userName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
                
            }
            document.getElementById('userName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            fetch('http://localhost:8080/api/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('usrLst').innerHTML += `<li>ID: ${data.id}, Name: ${data.name}, Email: ${data.email}, Password: ${data.password}</li>`;
   
            });
        });

        //Posts --------------------------------------------------------
        fetch('http://localhost:8080/api/posts')
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('pstLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Title: ${el.title}, Content: ${el.content}, topicId: ${el.topicId}, userId: ${el.userId}</li>`;
            })
        });    

        document.getElementById('pstBtn').addEventListener('click', e =>{
            e.preventDefault();
            const data = {
               
                topicId: document.getElementById('psttopicId').value,
                userId: document.getElementById('pstuserId').value, 
                title: document.getElementById('psttitle').value,
                content: document.getElementById('pstcontent').value
                
            }
            document.getElementById('psttopicId').value = '';
            document.getElementById('psttitle').value = '';
            document.getElementById('pstcontent').value = '';
            document.getElementById('pstuserId').value = '';

            fetch('http://localhost:8080/api/posts', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('pstLst').innerHTML += `<li>ID: ${data.id}, Title: ${data.title}, Content: ${data.content}, topicId: ${data.topicId}, userId: ${data.userId}</li>`;
   
            });
        });

        //Comments --------------------------------------------------------
        fetch('http://localhost:8080/api/comments')
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('cmtLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Content: ${el.content}, postId: ${el.postId}, userId: ${el.userId}</li>`;
            })
        });    

        document.getElementById('cmtBtn').addEventListener('click', e =>{
            e.preventDefault();
            const data = {
               
                topicId: document.getElementById('cmtpostId').value,
                userId: document.getElementById('cmtuserId').value, 
                content: document.getElementById('cmtcontent').value
                
            }
            
            document.getElementById('cmtpostId').value = '';
            document.getElementById('cmtuserId').value = '';
            document.getElementById('cmtcontent').value = '';

            console.log(JSON.stringify(data));
            fetch('http://localhost:8080/api/comments', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('cmtLst').innerHTML += `<li>ID: ${data.id}, Content: ${data.content}, userId: ${data.userId}, postId: ${data.postId}</li>`;
   
            });
        });

        //Interests --------------------------------------------------------
        fetch('http://localhost:8080/api/interests')
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('intrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, topicId: ${el.topicId}, userId: ${el.userId}</li>`;
            })
        });    

        document.getElementById('intrBtn').addEventListener('click', e =>{
            e.preventDefault();
            const data = {
               
                topicId: document.getElementById('intrtopicId').value,
                userId: document.getElementById('intruserId').value, 

                
            }
            document.getElementById('intrtopicId').value = '';
            document.getElementById('intruserId').value = '';

            fetch('http://localhost:8080/api/interests', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('intrLst').innerHTML += `<li>ID: ${data.id}, topicId: ${data.topicId}, userId: ${data.userId}</li>`;
   
            });
        });

         //LikedPosts --------------------------------------------------------
         fetch('http://localhost:8080/api/likedposts')
         .then(res => res.json())
         .then(data => {
             const lst = document.getElementById('lpstLst');
 
             data.forEach( el => {
                 lst.innerHTML += `<li>ID: ${el.id}, postId: ${el.postId}, userId: ${el.userId}</li>`;
             })
         });    
 
         document.getElementById('lpstBtn').addEventListener('click', e =>{
             e.preventDefault();
             const data = {
                
                 postId: document.getElementById('lpstpostId').value,
                 userId: document.getElementById('lpstuserId').value, 
 
                 
             }
             document.getElementById('lpstpostId').value = '';
             document.getElementById('lpstuserId').value = '';
 
             fetch('http://localhost:8080/api/likedposts', {
                 method: 'post',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
                 
             })
                 .then(res => res.json())
                 .then(data => {
                     document.getElementById('lpstLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
    
             });
         });

         //Likes --------------------------------------------------------
         fetch('http://localhost:8080/api/likes')
         .then(res => res.json())
         .then(data => {
             const lst = document.getElementById('lkLst');
 
             data.forEach( el => {
                 lst.innerHTML += `<li>ID: ${el.id}, postId: ${el.postId}, userId: ${el.userId}</li>`;
             })
         });    
 
         document.getElementById('lkBtn').addEventListener('click', e =>{
             e.preventDefault();
             const data = {
                
                 postId: document.getElementById('lkpostId').value,
                 userId: document.getElementById('lkuserId').value, 
 
                 
             }
             document.getElementById('lkpostId').value = '';
             document.getElementById('lkuserId').value = '';
 
             fetch('http://localhost:8080/api/likes', {
                 method: 'post',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
                 
             })
                 .then(res => res.json())
                 .then(data => {
                     document.getElementById('lkLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
    
             });
         });

         //Notifications --------------------------------------------------------
         fetch('http://localhost:8080/api/notifications')
         .then(res => res.json())
         .then(data => {
             const lst = document.getElementById('notifLst');
 
             data.forEach( el => {
                 lst.innerHTML += `<li>ID: ${el.id}, postId: ${el.postId}, notifType: ${el.notifType}</li>, Content: ${el.content}`;
             })
         });    
 
         document.getElementById('notifBtn').addEventListener('click', e =>{
             e.preventDefault();
             const data = {
                
                 postId: document.getElementById('notifpostId').value,
                 notifType: document.getElementById('notifType').value, 
                 content: document.getElementById('notifContent').value
 
                 
             }
             document.getElementById('notifpostId').value = '';
             document.getElementById('notifType').value = '';
             document.getElementById('notifContent').value = '';


             fetch('http://localhost:8080/api/notifications', {
                 method: 'post',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
                 
             })
                 .then(res => res.json())
                 .then(data => {
                     document.getElementById('notifLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, notifType: ${data.notifType}, Content: ${data.content}</li>`;
    
             });
         });

         //Topics --------------------------------------------------------
         fetch('http://localhost:8080/api/topics')
         .then(res => res.json())
         .then(data => {
             const lst = document.getElementById('tpLst');
 
             data.forEach( el => {
                 lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, userId: ${el.userId}, Description: ${el.description}</li>`;
             })
         });    
 
         document.getElementById('tpBtn').addEventListener('click', e =>{
             e.preventDefault();
             const data = {
                
                 name: document.getElementById('tpName').value,
                 userId: document.getElementById('tpuserId').value, 
                 description: document.getElementById('description').value
 
                 
             }
             document.getElementById('tpName').value = '';
             document.getElementById('tpuserId').value = '';
             document.getElementById('description').value = '';
             
             fetch('http://localhost:8080/api/topics', {
                 method: 'post',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
                 
             })
                 .then(res => res.json())
                 .then(data => {
                     document.getElementById('tpLst').innerHTML += `<li>ID: ${data.id}, Name: ${data.name}, userId: ${data.userId}, Description: ${data.description}</li>`;
    
             });
         });

         //Pinned Posts --------------------------------------------------------
         fetch('http://localhost:8080/api/pinnedposts')
         .then(res => res.json())
         .then(data => {
             const lst = document.getElementById('ppstLst');
 
             data.forEach( el => {
                 lst.innerHTML += `<li>ID: ${el.id}, postId: ${el.postId}, userId: ${el.userId}</li>`;
             })
         });    
 
         document.getElementById('ppstBtn').addEventListener('click', e =>{
             e.preventDefault();
             const data = {
                
                 postId: document.getElementById('ppstpostId').value,
                 userId: document.getElementById('ppstuserId').value 
                 
             }
             document.getElementById('ppstpostId').value = '';
             document.getElementById('ppstuserId').value = '';
             
             fetch('http://localhost:8080/api/pinnedposts', {
                 method: 'post',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
                 
             })
                 .then(res => res.json())
                 .then(data => {
                     document.getElementById('ppstLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
    
             });
         });
        //UsersNotifications --------------------------------------------------------
               fetch('http://localhost:8080/api/usersnotifications')
               .then(res => res.json())
               .then(data => {
                   const lst = document.getElementById('unLst');
       
                   data.forEach( el => {
                       lst.innerHTML += `<li>ID: ${el.id}, notificationId: ${el.notificationId}, userId: ${el.userId}</li>`;
                   })
               });    
       
               document.getElementById('unBtn').addEventListener('click', e =>{
                   e.preventDefault();
                   const data = {
                      
                       notificationId: document.getElementById('notificationId').value,
                       userId: document.getElementById('unuserId').value 
                       
                   }
                   document.getElementById('notificationId').value = '';
                   document.getElementById('unuserId').value = '';
                   
                   fetch('http://localhost:8080/api/usersnotifications', {
                       method: 'post',
                       headers: { 'Content-Type': 'application/json'},
                       body: JSON.stringify(data)
                       
                   })
                       .then(res => res.json())
                       .then(data => {
                           document.getElementById('unLst').innerHTML += `<li>ID: ${data.id}, notificationId: ${data.notificationId}, userId: ${data.userId}</li>`;
          
                   });
               });
}
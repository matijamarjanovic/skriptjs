function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    // Users ----------------------------------------------------------------
    fetch('http://127.0.0.1:8080/api/users', {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Email: ${el.email}, Password: ${el.password}, Admin: ${data.admin}</li>`;
            })
        });

        document.getElementById('usrBtn').addEventListener('click', e =>{
            e.preventDefault();
            const data = {
                name: document.getElementById('userName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                admin: document.getElementById('admin').checked
                
            }
            console.log(data);
            document.getElementById('userName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('admin').checked = false;
              
            if( data.name === '' || data.email === '' || data.password === ''){
                alert('Please fill out all the fields.');
            }else if (!data.email.includes('@')){
                alert('Please enter valid data.');
            }else{

                fetch('http://127.0.0.1:8080/api/users', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                            document.getElementById('usrLst').innerHTML += `<li>ID: ${data.id}, Name: ${data.name}, Email: ${data.email}, Password: ${data.password}, Admin: ${data.admin}</li>`;
    
                });
            }
        });

        //Posts --------------------------------------------------------
        fetch('http://127.0.0.1:8080/api/posts', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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

            if (data.topicId == '' || data.userId === ''|| data.title === '' || data.content === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/posts', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                            document.getElementById('pstLst').innerHTML += `<li>ID: ${data.id}, Title: ${data.title}, Content: ${data.content}, topicId: ${data.topicId}, userId: ${data.userId}</li>`;
                        
                });
            }
        });

        //Comments --------------------------------------------------------
        fetch('http://127.0.0.1:8080/api/comments', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('cmtLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, postId: ${el.postId}, userId: ${el.userId}, Content: ${el.content}</li>`;
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
            if (data.topicId == '' || data.userId === '' || data.content === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/comments', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                    
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined)
                            alert(data.message);
                        else 
                            document.getElementById('cmtLst').innerHTML += `<li>ID: ${data.id}, userId: ${data.userId}, postId: ${data.postId}, Content: ${data.content}</li>`;
    
                });
            }
        });

        //Interests --------------------------------------------------------
        fetch('http://127.0.0.1:8080/api/interests', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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

            if (data.topicId == '' || data.userId === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/interests', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                    
                })
                    .then(res => res.json())
                    .then(data => {
                        
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                            document.getElementById('intrLst').innerHTML += `<li>ID: ${data.id}, topicId: ${data.topicId}, userId: ${data.userId}</li>`;
    
                });
            }
        });

         //LikedPosts --------------------------------------------------------
         fetch('http://127.0.0.1:8080/api/likedposts', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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
            if (data.postId == '' || data.userId === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/likedposts', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                    
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                        document.getElementById('lpstLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
        
                });
            }
         });

         //Likes --------------------------------------------------------
         fetch('http://127.0.0.1:8080/api/likes', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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

            if (data.postId == '' || data.userId === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/likes', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                        document.getElementById('lkLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
        
                });
            }
         });

         //Notifications --------------------------------------------------------
         fetch('http://127.0.0.1:8080/api/notifications', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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

            if (data.postId == '' || data.notifType === ''|| data.content === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/notifications', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                    
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                        document.getElementById('notifLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, notifType: ${data.notifType}, Content: ${data.content}</li>`;
        
                });
            }
         });

         //Topics --------------------------------------------------------
         fetch('http://127.0.0.1:8080/api/topics', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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
             
             if (data.name == '' || data.userId === ''|| data.description === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/topics', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                       },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                        document.getElementById('tpLst').innerHTML += `<li>ID: ${data.id}, Name: ${data.name}, userId: ${data.userId}, Description: ${data.description}</li>`;
        
                });
            }
         });

         //Pinned Posts --------------------------------------------------------
         fetch('http://127.0.0.1:8080/api/pinnedposts', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
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
           
             if (data.name == '' || data.userId === ''|| data.description === '') {
                alert('Please fill out all the fields.');
            }else{
                fetch('http://127.0.0.1:8080/api/pinnedposts', {
                    method: 'post',
                    headers: {
                         'Content-Type': 'application/json', 
                         'Authorization': `Bearer ${token}`
                        },
                    body: JSON.stringify(data)
                    
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== null && data.message !== undefined )
                            alert(data.message);
                        else 
                        document.getElementById('ppstLst').innerHTML += `<li>ID: ${data.id}, postId: ${data.postId}, userId: ${data.userId}</li>`;
        
                });
                
            }
         });
        //UsersNotifications --------------------------------------------------------
               fetch('http://127.0.0.1:8080/api/usersnotifications', {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
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

                if (data.name == '' || data.userId === ''|| data.description === '') {
                    alert('Please fill out all the fields.');
                }else{
                    fetch('http://127.0.0.1:8080/api/usersnotifications', {
                        method: 'post',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                        
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message !== null && data.message !== undefined )
                                alert(data.message);
                            else 
                            document.getElementById('unLst').innerHTML += `<li>ID: ${data.id}, notificationId: ${data.notificationId}, userId: ${data.userId}</li>`;
            
                    });
                }
               });

               document.getElementById('logout').addEventListener('click', () => {
                    document.cookie = `token=;SameSite=Lax`;
                    window.location.href = 'login.html';
               });
}
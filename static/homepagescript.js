function init() {
    
    document.getElementById('usrBtn').addEventListener('click', e => {
        location.href = 'users.hmtl';
    });

    document.getElementById('pstBtn').addEventListener('click', e => {
        location.href = 'posts.hmtl';

    });

    document.getElementById('intBtn').addEventListener('click', e => {
        location.href = 'interests.hmtl';

    });

    document.getElementById('lpstBtn').addEventListener('click', e => {
        location.href = 'likedposts.hmtl';

    });

    document.getElementById('lkBtn').addEventListener('click', e => {
        location.href = 'likes.hmtl';

    });

    document.getElementById('notifBtn').addEventListener('click', e => {
        location.href = 'notifications.hmtl';

    });

    document.getElementById('tpBtn').addEventListener('click', e => {
        location.href = 'topics.hmtl';

    });

    document.getElementById('ppstBtn').addEventListener('click', e => {
        location.href = 'pinnedposts.hmtl';

    });

    document.getElementById('unBtn').addEventListener('click', e => {
        location.href = 'usersnotifications.hmtl';

    });

    document.getElementById('cmtBtn').addEventListener('click', e => {
        location.href = 'comments.hmtl';

    });
}
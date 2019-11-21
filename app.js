console.log('worked');

const posts = [];
let nextId = 1;

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.className = 'form-inline';

formEl.innerHTML = `
    <input type="text" class="form-control" data-id="link">
    <select class="form-control" data-id="type">
        <option value="regular">Текст</option>
        <option value="image">Изображение</option>
        <option value="video">Видео</option>
        <option value="audio">Аудио</option>
    </select>
    <button class="btn btn-light" data-action="add">OK</button>
`;
const linkEl = formEl.querySelector('[data-id=link]');
const typeEl = formEl.querySelector('[data-id=type]');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value;
   
    
    posts.push({
        id: nextId++,
        value,
        type,
        likes: 0,
    },);

    linkEl.value = '';
    linkEl.focus();
        posts.sort((a,b) => {
            return b.likes - a.likes
        })
    
    rebuildList(postsEl, posts);
    });

rootEl.appendChild(formEl);

const postsEl = document.createElement('div');
postsEl.className = 'list-group';

rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {

    for(const child of Array.from(containerEl.children)) {
        containerEl.removeChild(child);
    }
    for (const item of items) {
        const postsEl = document.createElement('div');
        postsEl.className = 'list-group-item';
        postsEl.dataset.id = `post-${item.id}`;
       
        if (item.type == 'image') {
            postsEl.innerHTML = `
                <img src="${item.value}" class="rounded" width="50" height="50">
                <button class="btn btn-primary" data-action="like"> ❤ ${item.likes}</button>
                <button class="btn btn-primary" data-action="dislike">dislike</button>
            `;
        }
        else if (item.type == 'video') {
            postsEl.innerHTML = `
                <video src = "${item.value}" class = "embed-responsive-item" controls>
                <button class="btn btn-primary" data-action="like"> ❤ ${item.likes}</button>
                <button class="btn btn-primary" data-action="dislike">dislike</button>
             `;
         }
        else if (item.type == 'audio') {
            postsEl.innerHTML = `
                <audio src = "${item.value}" class = "embed-responsive-item" controls>
                <button class="btn btn-primary" data-action="like"> ❤ ${item.likes}</button>
                <button class="btn btn-primary" data-action="dislike">dislike</button>
             `;
        }


        postsEl.querySelector('[data-action=like]').addEventListener('click', (event) => {
            item.likes++;
            items.sort((a, b) => {
                return b.likes - a.likes;
            })
            rebuildList(containerEl, items);
        });
        console.dir(postsEl);

        postsEl.querySelector('[data-action=dislike]').addEventListener('click', (event) => {
            item.likes--;
            items.sort((a, b) => {
                return b.likes - a.likes;
            })
            rebuildList(containerEl, items);
        });

    
        containerEl.insertBefore(postsEl, containerEl.nextSibling);
    }
};


/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [{
            name: '7 years',
            singer: 'Lukas Graham',
            path: './assets/music/7 Years - Lukas Graham [Lossless_FLAC].flac',
            image: './assets/img/7 years'
        },
        {
            name: 'All around the world',
            singer: 'R3hab',
            path: './assets/music/All Around The World La La La_ - R3hab_A.mp3',
            image: './assets/img/all around the world.png'
        },
        {
            name: 'Attention',
            singer: 'justin biber',
            path: './assets/music/Attention.mp3',
            image: './assets/img/attention.jpeg'
        },
        {
            name: 'Beautiful',
            singer: 'Bazzi',
            path: './assets/music/Beautiful - Bazzi.mp3',
            image: './assets/img/beautiful.jpg'
        },
        {
            name: 'Be like me',
            singer: 'Lil Pump',
            path: './assets/music/Be Like Me - Lil Pump_ Lil Wayne.mp3',
            image: './assets/img/belikeme.jpg'
        },
    ],
    render: function() {
        console.log(123);
    },
    start: function() {
        this.render();
    }
}
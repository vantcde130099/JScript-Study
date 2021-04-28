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

const cd = $('.cd');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [{
            name: '7 years',
            singer: 'Lukas Graham',
            path: './assets/music/7 Years - Lukas Graham [Lossless_FLAC].flac',
            image: './assets/img/7 years.jpg'
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
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        playBtn.onclick = function() {
                if (app.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
            //khi bai hat dc play
        audio.onplay = function() {
                app.isPlaying = true;
                player.classList.add('playing')
            }
            //khi bai hat dc pause
        audio.onpause = function() {
                app.isPlaying = false
                player.classList.remove('playing')
            }
            //khi tien do thay doi
        audio.ontimeupdate = function() {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            //xu ly tua nhac
        progress.onchange = function(e) { //e la phan tram
            const seek = audio.duration / 100 * e.target.value
            audio.currentTime = seek
        }
    },
    loadCurrentSong: function() {


        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    start: function() {
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong()
        this.render();
    }
}
app.start();
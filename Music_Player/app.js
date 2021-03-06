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
const cdWidth = cd.offsetWidth;
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
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
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active':'' }" data-index = "${index}">
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
        //x??? l?? ???n/hi???n cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //x??? l?? quay cd/pause
        cdThrumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10s
            intertions: Infinity //lap vo han
        })
        cdThrumbAnimate.pause()

        playBtn.onclick = function() {
                if (app.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
            //khi bai hat dc play
        audio.onplay = function() {
                cdThrumbAnimate.play()
                app.isPlaying = true;
                player.classList.add('playing')
            }
            //khi bai hat dc pause
        audio.onpause = function() {
                cdThrumbAnimate.pause()
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
            //x??? l?? next song
        nextBtn.onclick = function() {
                if (app.isRandom) {
                    app.playRandomSong()
                } else {
                    app.nextSong()
                }
                audio.play()
                app.render()
            }
            //x??? l?? prev song
        prevBtn.onclick = function() {
                if (app.isRandom)
                    app.playRandomSong()
                else
                    app.prevSong()
                audio.play()
                app.render()
            }
            //X??? l?? random song
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active', this.isRandom)
        }

        //x??? l?? next sau khi song k???t th??c
        audio.onended = function() {
            if (app.isRepeat)
                app.loadCurrentSong()
            else if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
        }
        repeatBtn.onclick = function() {
                app.isRepeat = !app.isRepeat
                repeatBtn.classList.toggle('active', this.isRepeat)
            }
            //l???ng nghe click v??o playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length)
                this.currentIndex = 0;
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0)
                this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        //?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();

        // L???ng nghe x??? l?? c??c event
        this.handleEvent();

        //T???i th??ng tin b??i h??t ?????u ti??n v??o ???ng d???ng
        this.loadCurrentSong()

        //render playlist
        this.render();

    }
}
app.start();
const imgCurrent = document.querySelector('.song.cd img');
const songNameCurrent = document.querySelector('.song.cd .songName');
const songSingerCurrent = document.querySelector('.song.cd .songSinger');
const audio = document.getElementById('audio');
const playbtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const nextbtn = document.getElementById('next-btn');
const prevbtn = document.getElementById('pre-btn');
const speaker = document.getElementById('speaker');
const volumn = document.getElementById('volumn');
const songList = document.querySelector('.songList');
const searchInput = document.getElementById('search');
const searchUl = document.getElementById('searchList');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isMuted: false,

    songs: [{
            id: 1,
            song_name: 'Believer',
            song_singer: 'IMAGINE DRAGON',
            path: './assets/music/song1.mp3',
            image: './assets/album/song1.png'
        },
        {
            id: 2,
            song_name: 'Faded',
            song_singer: 'ALAN WALKER',
            path: './assets/music/song2.mp3',
            image: './assets/album/song2.png'
        },
        {
            id: 3,
            song_name: 'Dream On',
            song_singer: 'ROGGER TERRY',
            path: './assets/music/song3.mp3',
            image: './assets/album/song3.png'
        },
        {
            id: 4,
            song_name: 'Natural',
            song_singer: 'IMAGINE DRAGON',
            path: './assets/music/song4.mp3',
            image: './assets/album/song4.png'
        },
        {
            id: 5,
            song_name: 'Túy Hồng Nhan',
            song_singer: 'THỦY HỬ',
            path: './assets/music/song5.mp3',
            image: './assets/album/song5.png'
        },
        {
            id: 6,
            song_name: 'Không cùng nhau',
            song_singer: 'TĂNG PHÚC',
            path: './assets/music/song6.mp3',
            image: './assets/album/song6.png'
        },
        {
            id: 7,
            song_name: 'Bad Liar',
            song_singer: 'IMAGINE DRAGON',
            path: './assets/music/song7.mp3',
            image: './assets/album/song7.png'
        },
        {
            id: 8,
            song_name: 'Dream On',
            song_singer: 'ROGGER TERRY',
            path: './assets/music/song3.mp3',
            image: './assets/album/song3.png'
        },
        {
            id: 9,
            song_name: 'Faded',
            song_singer: 'ALAN WALKER',
            path: './assets/music/song2.mp3',
            image: './assets/album/song2.png'
        },
        {
            id: 10,
            song_name: 'Dream On',
            song_singer: 'ROGGER TERRY',
            path: './assets/music/song3.mp3',
            image: './assets/album/song3.png'
        },
        {
            id: 11,
            song_name: 'Faded',
            song_singer: 'ALAN WALKER',
            path: './assets/music/song2.mp3',
            image: './assets/album/song2.png'
        },
        {
            id: 12,
            song_name: 'Dream On',
            song_singer: 'ROGGER TERRY',
            path: './assets/music/song3.mp3',
            image: './assets/album/song3.png'
        },
        {
            id: 13,
            song_name: 'Natural',
            song_singer: 'IMAGINE DRAGON',
            path: './assets/music/song4.mp3',
            image: './assets/album/song4.png'
        },
        {
            id: 14,
            song_name: 'Natural',
            song_singer: 'IMAGINE DRAGON',
            path: './assets/music/song4.mp3',
            image: './assets/album/song4.png'
        }
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
                return `
            <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}">
                <img src="${song.image}" alt="">
                <div class="songName">${song.song_name}</div>
                <div class="songSinger">${song.song_singer}</div>
            </div>
        `
            })
            // document.getElementsByClassName('songList')[0].innerHTML = htmls.join('');
        songList.innerHTML = htmls.join('');
    },

    //Xử lý các sự kiện xảy ra
    handleEvents: function() {
        const _this = this;
        //Xử lý phát nhạc khi bấm nút play
        playbtn.onclick = function() {
            if (!_this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        //Lắng nghe khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            playbtn.classList.add('pause');
        }

        //Lắng nghe khi song bị pause
        audio.onpause = function() {
            _this.isPlaying = false;
            playbtn.classList.remove('pause');
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            var progressPercent = audio.currentTime / audio.duration * 100;
            progress.value = progressPercent;

            //Gán giá trị cho đồng hổ hiển thị thời gian bài hát
            var minutes = Math.floor(audio.currentTime / 60);
            var seconds = Math.floor(audio.currentTime % 60)
            timer.innerHTML = `${minutes} \: ${seconds}`;

        }

        //Khi tua bài hát
        progress.onchange = function(e) {
            // _this.progressPercent = e.target.value;
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
            console.log(seekTime);
        }

        //Tự động chuyển bài kế tiếp
        audio.onended = function() {
            _this.nextSong();
            audio.play();
        }

        //Chuyển bài hát kế tiếp
        nextbtn.onclick = function() {
            _this.nextSong();
            audio.play();
        }

        //Trở về bài hát trước
        prevbtn.onclick = function() {
            _this.prevSong();
            audio.play();
        }

        //Tăng giảm âm lượng bài hát
        //Mở thanh âm lượng
        speaker.onclick = function(e) {
                this.classList.toggle('clicked');
            }
            //Thay đổi âm lượng
        volumn.onchange = function() {
                audio.volume = volumn.value / 100;
                speaker.classList.remove('muted');
            }
            //Mute khi double click
        speaker.ondblclick = function() {
            if (_this.isMuted) {
                audio.volume = volumn.value / 100;
                _this.isMuted = false;
                this.classList.remove('muted');

            } else {
                audio.volume = 0;
                this.classList.add('muted');
                _this.isMuted = true;
            }
        }

        //Chọn bài hát bằng việc click
        songList.onclick = function(e) {
            const selectedSong = e.target.closest('.song:not(.active)');
            if (selectedSong) {

                _this.currentIndex = Number(selectedSong.getAttribute('data-index'));
                _this.loadCurrentSong();
                // _this.render();
                audio.play();
            }

        }

        //Lắng nghe việc search
        searchInput.oninput = function() {
            _this.searchSong();
            searchUl.style.display = 'block';
        }


        searchUl.onclick = function(e) {
            const selectedSong = e.target.closest('.song');
            console.log(selectedSong)
            if (selectedSong) {
                _this.currentIndex = Number(selectedSong.getAttribute('songID')) - 1;
                _this.loadCurrentSong();
                // _this.render();
                audio.play();
                searchInput.value = '';
                searchUl.style.display = 'none';

            }


        }

        searchInput.addEventListener('focusout', (e) => {
            console.log('out', e.target);
            const condi = true;
            // setTimeout(() => searchUl.style.display = 'none', 0)
            _this.searchSong(condi);
        });

    },

    //Định nghĩa bài hát hiện tại
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });


    },

    scrollToCurrentSong: function() {
        setTimeout(() => {
            const activeSong = document.querySelector('.active');
            activeSong.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    //Load bài hát hiện tại
    loadCurrentSong: function() {
        imgCurrent.src = this.currentSong.image;
        songNameCurrent.innerText = this.currentSong.song_name;
        songSingerCurrent.innerText = this.currentSong.song_singer;
        audio.src = this.currentSong.path;
        progress.value = 0;
        // console.log('ok', progress.value);
        this.render();
        this.scrollToCurrentSong();

    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length)
            this.currentIndex = 0;
        this.loadCurrentSong();

    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex <= 0)
            this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },

    //Tìm kiếm bài hát
    searchSong: function(condi) {
        let searchValue = searchInput.value.toUpperCase();
        if (searchValue) {
            let lis = this.songs.map((s) => {
                if (s.song_name.toUpperCase().indexOf(searchValue) > -1) {
                    return `<li><div class="song cd" songID="${s.id}">
                    <img src="${s.image}" alt="">
                    <div class="details">
                        <div class="songName">${s.song_name}</div>
                        <div class="songSinger">${s.song_singer}</div>
                    </div>
                </div></li>`;
                }
            });
            searchUl.innerHTML = lis.join('');
        }
        if (condi) {
            searchUl.innerHTML = '';
        }

    },

    start: function() {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        //Xử lý các sự kiện xảy ra (DOM events)
        this.handleEvents();

        //Tải thông tin bài hát đầu tiên
        this.loadCurrentSong();

        //Render ra danh sách bài hát
        this.render();


    }
}

app.start();
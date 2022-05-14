const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const heading = $("header h2");
const thumbBox = $(".cd-thumb-box");
const thumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const cdThumb = $(".cd-thumb");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");

// api songs
/**
 * 1. render songs
 * 2. load current song
 */

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Trước đây đã từng nói | 小阿七",
      singer: "- Tiểu A Thất | 小阿七",
      path: "./asset/music/truocdaydatungnoi-tieuathat.mp3",
      image: "./asset/img/ttruc.jpg",
    },
    {
      name: "Bầu Trời Đầy Sao Không Bằng Anh | 满天星辰不及你",
      singer: "- Ycccc",
      path: "./asset/music/bautroidaysao.mp3",
      image: "./asset/img/ttruc1.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
        <div class="song">
        <div
          class="thumb"
          style="
            background-image: url('${song.image}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
        `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name + " " + this.currentSong.singer;
    thumbBox.style.backgroundImage = `url("${this.currentSong.image}")`;
    thumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  handleEven: function () {
    // next song
    nextBtn.onclick = function () {
      app.nextSong();
      audio.play();
    };
    prevBtn.onclick = function () {
      app.prevSong();
      audio.play();
    };
    // xu ly quay
    const lengthAudio = 100000;
    const cdThumbAnimation = cdThumb.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: lengthAudio,
        iterations: Infinity,
      }
    );
    cdThumbAnimation.pause();
    // xu ly play
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimation.play();
    };
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimation.pause();
    };
    // xu ly thanh
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    progress.oninput = function (e) {
      audio.currentTime = e.target.value * (audio.duration / 100);
    };
  },

  start: function () {
    // dinh nghia thuoc tinh cho object
    this.defineProperties();
    // tai bai hat dau tien
    this.loadCurrentSong();
    // lang nghe xu ly su kien DOM even
    this.handleEven();
    //render
    this.render();
  },
};

app.start();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const headingName = $("header h2");
const headingSinger = $("header h3");
const thumbBox = $(".cd-thumb-box");
const thumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const cdThumb = $(".cd-thumb");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const listBtn = $(".navbar-icons");
const playlist = $(".playlist");
const songBegin = $(".song-begin");
const songDuration = $(".song-duration");

// api songs
/**
 * 1. render songs
 * 2. load current song
 * 3. next prev
 * 4. random
 * 5. next when song end
 * 6. active song
 */

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Anh không hiểu • 你不明白",
      singer: "-  joysaaaa",
      path: "./asset/music/anhkhonghieu.mp3",
      image: "./asset/img/anhkhonghieu.png",
    },
    {
      name: "Hướng ánh sáng | 光的方向",
      singer: "- Vương Vũ Đồng | 王雨桐",
      path: "./asset/music/huongcuaanhsang.mp3",
      image: "./asset/img/huongcuaanhsang.png",
    },
    {
      name: "Sau Này Khi Gặp Được Anh Ấy | 后来遇见他 ",
      singer: "- Hồ 66 | 胡66",
      path: "./asset/music/saunaykhigapduoc.mp3",
      image: "./asset/img/saunaykhigapduoc.png",
    },
    {
      name: "Rơi Vào Biển Cả | 落海",
      singer: "- Nhậm Nhiên | 任然",
      path: "./asset/music/roixuongbienca.mp3",
      image: "./asset/img/roivaobienca.png",
    },
    {
      name: "Năm mươi năm về sau (五十年以后) ",
      singer: "- Hải Lai A Mộc",
      path: "./asset/music/nammuoinamsau.mp3",
      image: "./asset/img/nammuoinamsau.jpg",
    },
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
    {
      name: "May mắn | 《有幸》",
      singer: "- Nhậm Nhiên - 任然",
      path: "./asset/music/maymannhamnhien.mp3",
      image: "./asset/img/mayman.png",
    },
    {
      name: "Buồn không thể buông",
      singer: "- Chilly Cover",
      path: "./asset/music/buonkhongthebuong.mp3",
      image: "./asset/img/buonkhongthebuong.png",
    },
    {
      name: "Ngày mưa dông | 阴雨天",
      singer: "- Tiểu Điền Âm Nhạc Xã | 小田音乐社",
      path: "./asset/music/ngaymuagiong.mp3",
      image: "./asset/img/ngaymuagiong.png",
    },
    {
      name: "Chúng ta | 《我们啊》",
      singer: "- BA KHỐI GỖ | 三块木头",
      path: "./asset/music/chungta.mp3",
      image: "./asset/img/chungta.png",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index == this.currentIndex ? "active" : ""} 
        " data-index="${index}">
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
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    headingName.textContent = this.currentSong.name;
    headingSinger.textContent = this.currentSong.singer;

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
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  formatTime: function (sec_num) {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

    hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
  },
  updateProgress: function () {
    const time = this.formatTime(audio.currentTime);
    songBegin.textContent = time;
  },
  handleEven: function () {
    // next song
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
    };
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      app.render();
    };
    // xu ly quay
    const lengthAudio = 70000;
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
    // random
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("active", app.isRandom);
    };
    // repeat
    repeatBtn.onclick = function () {
      app.isRepeat = !app.isRepeat;
      repeatBtn.classList.toggle("active", app.isRepeat);
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
        app.updateProgress();
      }
    };
    progress.oninput = function (e) {
      audio.currentTime = e.target.value * (audio.duration / 100);
    };
    // xu ly menu
    listBtn.onclick = function () {
      listBtn.classList.toggle("open");
      playlist.classList.toggle("openList");
    };
    // xu ly khi ket thuc bai hat thi chuyen sang bai hat moi
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          console.log(songNode.dataset.index);
          app.currentIndex = Number(songNode.dataset.index);
          app.loadCurrentSong();
          app.render();
          audio.play();
          listBtn.click();
        }
        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
    audio.onloadeddata = function () {
      songDuration.textContent = app.formatTime(audio.duration);
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

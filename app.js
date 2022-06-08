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
const note = $(".note");
const bgMusic = $(".dashboard");
const layer = $(".layer");
const cdBox = $(".cd-box");

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
      name: "Yêu Anh",
      singer: "- Diệp Quỳnh Lâm",
      path: "./asset/music/yeuanh.mp3",
      image: "./asset/img/yeuanh.png",
      note: "</br>⋆🌙",
    },
    {
      name: "  Gốc bệnh | 病因",
      singer: "- yihuik苡慧",
      path: "./asset/music/gocbenh.mp3",
      image: "./asset/img/gocbenh.png",
      note: "Ngay cả khi bạn quay lại, </br>bạn không thể chữa lành cho tôi.</br>⋆🌙",
    },
    {
      name: " Bạn từng là thiếu niên 你曾是少年",
      singer: "- S.H.E",
      path: "./asset/music/bantunglathieunien.mp3",
      image: "./asset/img/bantunglathieunien.png",
      note: "Nhiều năm trước, có một đôi mắt trong veo, nhanh như tia chớp mùa xuân, nó muốn nhìn thế giới xa nhất, nó cảm thấy mình có đôi cánh để bay qua núi và đại dương.</br>⋆⋆⋆",
    },
    {
      name: " Trở Về Mùa Hạ|回到夏天",
      singer: "- Ngạo Thất Gia",
      path: "./asset/music/trovemuaha.mp3",
      image: "./asset/img/trovemuaha.png",
      note: "Nếu được quay trở lại mùa hạ năm ấy, tớ nhất định sẽ không thích cậu</br>⋆🌙",
    },
    {
      name: "Ngôi Sao Trên Trời Không Nói Chuyện",
      singer: "- Bất Thị Hoa Hỏa Nha ft KOZAY",
      path: "./asset/music/ngoisaotrentroikhongnoichuyen.mp3",
      image: "./asset/img/ngoisaotrentroikhongnoichuyen.png",
      note: "Cảm ơn những suy nghĩ của mẹ, sưởi ấm những năm tháng của con, cảm ơn mẹ không phải siêu nhân mà trở thành đấng toàn năng cho con, cảm ơn mẹ đã là mẹ của con, đây là may mắn và phước lành lớn nhất trong cuộc đời của con. </br>⋆🌙 ⋆🌙 ⋆🌙 ⋆🌙",
    },
    {
      name: "Rất Muốn, Rất Muốn | 好想好想 |",
      singer: "- Cổ Cự Cơ | 古巨基",
      path: "./asset/music/ratmuonratmuon.mp3",
      image: "./asset/img/ratmuonratmuon.png",
      note: "⋆🌙 ⋆🌙 ⋆🌙 ⋆🌙",
    },
    {
      name: "Chính là yêu anh",
      singer: "- yihuik Dĩ Tuệ",
      path: "./asset/music/chinhlayeuanh.mp3",
      image: "./asset/img/chinhlayeuanh.png",
      note: " Thứ tình yêu có thể trôi đi mãi mãi, mùa hạ qua đi, mùa thu qua đi, tươi mát mất đi là thứ cuồng nhiệt. </br>⋆🌙 ⋆🌙 ⋆🌙 ⋆🌙",
    },
    {
      name: "Dũng khí",
      singer: "- Lương Tịnh Như",
      path: "./asset/music/dungkhi1.mp3",
      image: "./asset/img/dungkhi.png",
      note: "Nhiều lúc không biết rằng bản thân mình cần điều gì nhất - yêu một ai đó hay chỉ là sự tĩnh lặng trong thế giới vội vã này...♥",
    },
    {
      name: "Sao mà anh ngốc đến em thích anh cũng không biết",
      singer: "- Trâu Niệm Từ",
      path: "./asset/music/anhthatngoc.mp3",
      image: "./asset/img/anhthatngoc.png",
      note: "♥",
    },
    {
      name: "HỌA cover",
      singer: "- Vương Cự Tinh",
      path: "./asset/music/hoa.mp3",
      image: "./asset/img/bg2.jpg",
      note: "Lâu lắm mới nghe lại á ♥",
    },
    {
      name: "Phồn Hoa - 繁花",
      singer: "- Đổng Trinh",
      path: "./asset/music/phonhoa.mp3",
      image: "./asset/img/phonhoa.jpg",
      note: "Tự nhiên lại nhớ vườn đào mười dặm rồi ♥",
    },
    {
      name: "Cổ tích gối đầu giường  枕边童话",
      singer: "- Ngạo Thất Gia 傲七爷",
      path: "./asset/music/cotichgoidaugiuong.mp3",
      image: "./asset/img/cotichgoidaugiuong.png",
      note: "Đừng trách phù thủy cả người đều là năng lượng xấu, vì cả đời này của nàng ấy hoàn toàn không nhận được một chút ánh sáng ấm áp nào. Người thường sống trong bóng tối sao có thể vui vẻ đối đãi với cuộc đời đây? ♥</br> cr: Mai Anh",
    },
    {
      name: "Tình yêu vĩnh viễn không mất đi",
      singer: "- Châu Hưng Triết",
      path: "./asset/music/tinhyeuvinhvienkhongmatdi.mp3",
      image: "./asset/img/tinhyeuvinhvienkhongmatdi1.png",
      note: "Nếu sau này không thể gặp lại, mong rằng bạn có thể sống thật tốt, yêu một người, sau đó chậm rãi già đi.. ♥</br> cr: thgiann_",
    },
    {
      name: "Tình yêu vĩnh viễn không mất đi",
      singer: "- Shan Yi chun",
      path: "./asset/music/tinhyeuvinhvienkhongmatdi1.mp3",
      image: "./asset/img/tinhyeuvinhvienkhongmatdi.png",
      note: "Nếu sau này không thể gặp lại, mong rằng bạn có thể sống thật tốt, yêu một người, sau đó chậm rãi già đi.. ♥</br> cr: thgiann_",
    },
    {
      name: "Một Đường Nở Hoa",
      singer: "- Ôn Dịch Tâm",
      path: "./asset/music/motduongnohoa.mp3",
      image: "./asset/img/motduongnohoa.png",
      note: "Nguyện cho em sau này một đời an nhiên, bờ vai vững chãi. Nguyện cho em sẽ có người lương thiện kề bên bầu bạn. Những ngày tháng sau không chút muộn phiền ♥ </br>cr: thgiann_",
    },
    {
      name: "Em Bị Cảm Nắng Ở Nơi Đó",
      singer: "- Đào Lân Trúc",
      path: "./asset/music/embicamnang.mp3",
      image: "./asset/img/embicamnang.png",
      note: "Darling Darling Darling ♥",
    },
    {
      name: "Anh không hiểu • 你不明白",
      singer: "- joysaaaa",
      path: "./asset/music/anhkhonghieu.mp3",
      image: "./asset/img/anhkhonghieu.png",
      note: "Thực lòng cậu có yêu tôi như lời cậu nói ?",
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
      note: "Sau này khi gặp được anh ấy rồi người cùng em trải qua xuân hạ thu đông. Hi vọng em sẽ không còn nhớ đến anh nữa.. ♥</br>cr:thgiann_",
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
        <div class="option ${
          index == this.currentIndex ? "active" : ""
        } " data-index="${index}">
          <!-- <i class="fas fa-ellipsis-h"></i> -->
          <i class="fa-solid fa-heart"></i>
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
    bgMusic.style.backgroundImage = `url(${this.currentSong.image})`;
    thumbBox.style.backgroundImage = `url("${this.currentSong.image}")`;
    thumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
    note.innerHTML = this.currentSong.note || "";
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
      thumb.classList.add("right");
      cdBox.classList.add("active");
    };
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimation.pause();
      thumb.classList.remove("right");
      cdBox.classList.remove("active");
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
      layer.classList.toggle("active");
    };
    layer.onclick = function () {
      listBtn.classList.toggle("open");
      playlist.classList.toggle("openList");
      layer.classList.toggle("active");
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
      const op = e.target.closest(".option");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index);
          app.loadCurrentSong();
          app.render();
          audio.play();
          listBtn.click();
        }
        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (op) {
          // op.classList.toggle("active");
          // console.log(op.dataset.index);
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

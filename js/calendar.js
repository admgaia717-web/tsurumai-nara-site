/**
 * Tsurumai Community Calendar Component
 * Googleカレンダー風の月次カレンダー
 */

// イベントデータ（後で外部データソースに置き換え可能）
const eventData = {
    // 定例イベント（依頼主確認：つるマルシェは毎月第3土曜10時、カラオケ大会は奇数月第3土曜13時）
    '2026-01-17': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-02-21': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-04-18': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-05-16': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-06-20': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-06-21': [{ title: 'つむぎフェスタ', time: '10:00〜12:00', location: '鶴舞小学校 校庭' }],
    '2026-07-18': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-08-15': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-09-19': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-10-17': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-11-21': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-12-19': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }],
    '2026-01-15': [{ title: '防災訓練', time: '10:00', location: '鶴舞小学校' }],
    '2026-01-20': [{ title: '福祉部会定例会', time: '14:00', location: '公民館' }, { title: '交通安全指導員活動', time: '', location: '学園前駅' }],
    '2026-01-25': [{ title: 'つむぎフェスタ', time: '10:00-15:00', location: '鶴舞小学校 校庭' }],
    '2026-02-02': [{ title: '移動支援利用説明会', time: '13:00', location: '公民館' }],
    '2026-02-08': [{ title: '地域清掃活動', time: '9:00', location: '地区内各所' }],
    '2026-02-11': [{ title: '建国記念の日', time: '祝日', location: '' }],
    '2026-02-14': [{ title: '文化教育部会', time: '14:00', location: '公民館' }],
    '2026-02-15': [{ title: '特殊詐欺防止活動', time: '', location: '金融機関前' }],
    '2026-02-20': [{ title: '交通安全指導員活動', time: '', location: '学園前駅' }],
    '2026-02-22': [{ title: 'つむぎフェスタ', time: '10:00-15:00', location: '鶴舞小学校 校庭' }],
    '2026-03-01': [{ title: '理事会', time: '10:00', location: '公民館' }],
    '2026-03-12': [{ title: '中学校卒業式', time: '', location: '奈良市立登美ヶ丘中学校' }],
    '2026-03-15': [{ title: '春の防災講習会', time: '13:30', location: '鶴舞小学校' }],
    '2026-03-18': [{ title: '小学校卒業式', time: '', location: '鶴舞小学校' }],
    '2026-03-20': [{ title: '交通安全指導員活動', time: '', location: '学園前駅' }],
    '2026-03-21': [{ title: 'つるマルシェ', time: '10:00〜', location: '地域内会場' }, { title: 'カラオケ大会', time: '13:00〜', location: '地域内会場' }],
    '2026-03-22': [{ title: 'つむぎフェスタ', time: '10:00〜', location: '鶴舞小学校 校庭' }],
    '2026-04-01': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: '自転車交通反則通告制度スタート', time: '', location: '' }
    ],
    '2026-04-03': [{ title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-06': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-08': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: '健康体操', time: '', location: '鶴舞地区社会福祉協議会' }
    ],
    '2026-04-10': [{ title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-11': [{ title: '親子タケノコ掘り体験', time: '10:00〜14:00', location: '奈良市歌姫町1395-2' }],
    '2026-04-13': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-15': [{ title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' }],
    '2026-04-17': [{ title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-20': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-22': [{ title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' }],
    '2026-04-24': [{ title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-27': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-04-29': [{ title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' }],
    '2026-05-01': [{ title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '鶴舞団地西町6・7棟東広場' }],
    '2026-05-06': [
        { title: 'つるまい元気アップ', time: '13:00〜14:30', location: '鶴舞団地集会所・広場' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-05-08': [{ title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '鶴舞団地東広場' }],
    '2026-05-13': [
        { title: '健康体操', time: '13:00〜13:40', location: '学園朝日町・元町公民館' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-05-15': [{ title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '鶴舞団地西町6・7棟東広場' }],
    '2026-05-18': [{ title: '麻雀を楽しもう', time: '13:30〜17:30', location: '学園朝日町・元町公民館' }],
    '2026-05-19': [{ title: 'はならた', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }],
    '2026-05-20': [
        { title: 'つるまい元気アップ', time: '13:00〜14:30', location: '鶴舞団地集会所・広場' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' },
        { title: '白玉団子作り', time: '14:00〜', location: '学園朝日町・元町公民館' }
    ],
    '2026-05-22': [{ title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '鶴舞団地東広場' }],
    '2026-05-24': [{ title: '奈良市のごみを考える市民説明会', time: '10:00〜12:00', location: '奈良市役所 中央棟6階 正庁' }],
    '2026-05-27': [{ title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }],
    '2026-06-01': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-06-03': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: 'つるまい元気アップ', time: '13:00〜14:30', location: '鶴舞団地集会所・広場' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-06-05': [
        { title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' },
        { title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '西町6・7棟' }
    ],
    '2026-06-08': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-06-10': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: '健康体操', time: '13:00〜13:40', location: '学園朝日町・元町公民館' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-06-12': [
        { title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' },
        { title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '東広場' }
    ],
    '2026-06-15': [
        { title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' },
        { title: '麻雀を楽しもう', time: '13:30〜16:30', location: '学園朝日町・元町公民館' }
    ],
    '2026-06-16': [{ title: 'はなうた', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }],
    '2026-06-17': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: 'つるまい元気アップ', time: '13:00〜14:30', location: '鶴舞団地集会所・広場' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-06-19': [
        { title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' },
        { title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '西町6・7棟' }
    ],
    '2026-06-22': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }],
    '2026-06-24': [
        { title: '移動販売', time: '13:40〜14:10', location: '学園朝日町・元町公民館' },
        { title: 'シャヴェール', time: '14:00〜15:00', location: '学園朝日町・元町公民館' }
    ],
    '2026-06-26': [
        { title: '移動販売', time: '14:00〜14:30', location: '鶴舞団地西町UR管理事務所付近' },
        { title: 'つるまいモルック・ボッチャ', time: '14:00〜15:30', location: '東広場' }
    ],
    '2026-06-29': [{ title: '移動販売', time: '15:40〜16:10', location: '鶴舞団地西町UR管理事務所付近' }]
};

class TsurumaiCalendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();

        this.init();
    }

    init() {
        this.renderCalendar();
        this.renderTopics();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
            this.renderTopics();
        });

        document.getElementById('nextMonth')?.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
            this.renderTopics();
        });

        // モーダル閉じる
        document.getElementById('eventModalClose')?.addEventListener('click', () => {
            document.getElementById('eventModal').classList.remove('is-active');
        });

        document.getElementById('eventModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'eventModal') {
                document.getElementById('eventModal').classList.remove('is-active');
            }
        });
    }

    renderCalendar() {
        const titleEl = document.getElementById('calendarTitle');
        const gridEl = document.getElementById('calendarGrid');

        if (!titleEl || !gridEl) return;

        // タイトル更新
        const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        titleEl.textContent = `${this.currentYear}年${monthNames[this.currentMonth]}`;

        // グリッド生成
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        // 前月の日数
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();

        let html = '';
        let dayCount = 1;
        let nextMonthDay = 1;

        const today = new Date();
        const todayStr = this.formatDate(today);

        // 6週分のカレンダー
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const cellIndex = week * 7 + day;

                let dayNum, isOtherMonth = false, dateStr = '';

                if (cellIndex < startDayOfWeek) {
                    // 前月
                    dayNum = prevMonthLastDay - startDayOfWeek + cellIndex + 1;
                    isOtherMonth = true;
                    const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
                    const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
                    dateStr = this.formatDate(new Date(prevYear, prevMonth, dayNum));
                } else if (dayCount > daysInMonth) {
                    // 次月
                    dayNum = nextMonthDay++;
                    isOtherMonth = true;
                    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
                    const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
                    dateStr = this.formatDate(new Date(nextYear, nextMonth, dayNum));
                } else {
                    // 当月
                    dayNum = dayCount++;
                    dateStr = this.formatDate(new Date(this.currentYear, this.currentMonth, dayNum));
                }

                const isToday = dateStr === todayStr;
                const hasEvent = eventData[dateStr];
                const isSunday = day === 0;
                const isSaturday = day === 6;

                let classes = ['calendar__day'];
                if (isOtherMonth) classes.push('calendar__day--other-month');
                if (isToday) classes.push('calendar__day--today');
                if (hasEvent) classes.push('calendar__day--has-event');
                if (isSunday && !isOtherMonth) classes.push('calendar__day--sunday');
                if (isSaturday && !isOtherMonth) classes.push('calendar__day--saturday');

                html += `<div class="${classes.join(' ')}" data-date="${dateStr}">${dayNum}</div>`;
            }
        }

        gridEl.innerHTML = html;

        // 日付クリックイベント
        gridEl.querySelectorAll('.calendar__day').forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const date = dayEl.dataset.date;
                this.showEventModal(date);
            });
        });
    }

    renderTopics() {
        const listEl = document.getElementById('topicsList');
        if (!listEl) return;

        // 今月と来月のイベントを抽出
        const upcomingEvents = [];
        const today = new Date();

        Object.entries(eventData).forEach(([date, events]) => {
            const eventDate = new Date(date);
            const diffDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays <= 60) {
                events.forEach(event => {
                    upcomingEvents.push({
                        date,
                        ...event
                    });
                });
            }
        });

        // 日付順にソート
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // 最大5件表示
        const displayEvents = upcomingEvents.slice(0, 5);

        if (displayEvents.length === 0) {
            listEl.innerHTML = '<li class="calendar__topic-item"><span class="calendar__topic-text">予定されているイベントはありません</span></li>';
            return;
        }

        listEl.innerHTML = displayEvents.map(event => {
            const d = new Date(event.date);
            const month = d.getMonth() + 1;
            const day = d.getDate();
            return `
                <li class="calendar__topic-item">
                    <span class="calendar__topic-date">${month}/${day}</span>
                    <span class="calendar__topic-text">${event.title}</span>
                </li>
            `;
        }).join('');
    }

    showEventModal(dateStr) {
        const modal = document.getElementById('eventModal');
        const dateEl = document.getElementById('eventModalDate');
        const listEl = document.getElementById('eventModalList');

        if (!modal || !dateEl || !listEl) return;

        const d = new Date(dateStr);
        const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

        dateEl.textContent = `${d.getFullYear()}年${monthNames[d.getMonth()]}${d.getDate()}日（${dayNames[d.getDay()]}）`;

        const events = eventData[dateStr];

        if (events && events.length > 0) {
            listEl.innerHTML = events.map(event => `
                <li class="event-modal__item">
                    <span class="event-title">${event.title}${event.time ? `　<span style="font-weight:400;font-size:0.85rem;color:#666;">${event.time}</span>` : ''}</span>
                    ${event.location ? `<span class="event-place">${event.location}</span>` : ''}
                </li>
            `).join('');
        } else {
            listEl.innerHTML = '<li class="event-modal__item"><span class="event-title" style="color:#888;font-weight:400;">この日の予定はありません</span></li>';
        }

        modal.classList.add('is-active');
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

// スライドショー機能
class Slideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.slides = document.querySelectorAll('.slideshow__slide');
        this.dots = document.querySelectorAll('.slideshow__dot');

        if (this.slides.length === 0) return;

        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetAutoPlay();
            });
        });
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
        });
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
        });
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new TsurumaiCalendar();
    new Slideshow();
});

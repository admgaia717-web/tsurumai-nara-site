# 独自ドメイン切替手順

現在の仮公開URL:

https://admgaia717-web.github.io/tsurumai-nara-site/

`tsurumai-nara.com` をGitHub Pagesへ向けるDNS設定:

| 種別 | 名前 | 値 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | admgaia717-web.github.io |

DNS反映後、リポジトリ直下に `CNAME` を追加して内容を `tsurumai-nara.com` にする。

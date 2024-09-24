/**
 * 签到加密方案
 * http://10.100.0.108:8090/pages/viewpage.action?pageId=27067670
 */
import {aesEncryption} from "./index";
import CryptoJS from "crypto-js";
const keys = [
	"oha24qrca1eg8kcw",
	"j7b2g6rv1elwfgl7",
	"qyheey7k4z2ffg3d",
	"7ur0q3cmdkugkwyu",
	"mygqef59huke70t9",
	"rrm09v7xbhu4ckod",
	"c0rnjbgxqnqn5750",
	"m0vkgq1efydk8xju",
	"zb3gastehq7fydx6",
	"2z8tnpmqgnj6scjz",
	"fii9lhuomhmockp3",
	"319zi5vpmg0i1q6u",
	"sx54ynjllvob8g89",
	"ggfoornff0hsncke",
	"9fvvmhjmoiml47gf",
	"b8auc0zqrv4ftxca",
	"p1qyd30oj8ldakzr",
	"r6830brshvau18pk",
	"h701zwgwj1ef0yra",
	"eie645uylcskwkrj",
	"iflbn99ebf35hpny",
	"oqfm317ejib2ccah",
	"gpxlqd6f0h3db6be",
	"0m85bmc6l6zn5jif",
	"nn49263hpmra2esy",
	"5kytfgoic7yt3er8",
	"l6wdd19mcdpk9sqg",
	"xmamf31f6bt8hye1",
	"e2a1ykrll9aoegj1",
	"ud7kk2py1xytqvcl"
]

export const aesEncryption4SigIn = (data, times) => {
	const key  = CryptoJS.enc.Latin1.parse(keys[times%30]);
	const iv = CryptoJS.enc.Latin1.parse('1545456413215484');
	return aesEncryption(data, key, {
		iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
}

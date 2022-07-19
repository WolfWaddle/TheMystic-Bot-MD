process.env['node_tls_reject_unauthorized'] = '0';
import './config.js';
import { createrequire } from "module"; 
import path, { join } from 'path'
import { fileurltopath, pathtofileurl } from 'url'
import { platform } from 'process'
import * as ws from 'ws';
import { readdirsync, statsync, unlinksync, existssync, readfilesync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import p from 'pino';
import { makewasocket, prototype, serialize } from './lib/simple.js';
import { low, jsonfile } from 'lowdb';
import { mongodb, mongodbv2 } from './lib/mongodb.js';
import store from './lib/store.js'
const { usesinglefileauthstate, disconnectreason, msgretrycountermap } = await import('@adiwajshing/baileys')
const { connecting } = ws
const { chain } = lodash
const port = process.env.port || process.env.server_port || 3000

prototype()
serialize()

global.__filename = function filename(pathurl = import.meta.url, rmprefix = platform !== 'win32') { return rmprefix ? /file:\/\/\//.test(pathurl) ? fileurltopath(pathurl) : pathurl : pathtofileurl(pathurl).tostring() }; global.__dirname = function dirname(pathurl) { return path.dirname(global.__filename(pathurl, true)) }; global.__require = function require(dir = import.meta.url) { return createrequire(dir) }

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.apis ? global.apis[name] : name) + path + (query || apikeyqueryname ? '?' + new urlsearchparams(object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.apikeys[name in global.apis ? global.apis[name] : name] } : {}) })) : '')

global.timestamp = { start: new date }

const __dirname = global.__dirname(import.meta.url)

global.opts = new object(yargs(process.argv.slice(2)).exitprocess(false).parse())
global.prefix = new regexp('^[' + (opts['prefix'] || 'xzxz/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-hhhhbb.aa').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new low(
/https?:\/\//.test(opts['db'] || '') ?
new clouddbadapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
(opts['mongodbv2'] ? new mongodbv2(opts['db']) : new mongodb(opts['db'])) :
new jsonfile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))

global.database = global.db // backwards compatibility
global.loaddatabase = async function loaddatabase() {
if (global.db.read) return new promise((resolve) => setinterval(async function () {
if (!global.db.read) {
clearinterval(this)
resolve(global.db.data == null ? global.loaddatabase() : global.db.data)
}
}, 1 * 1000))
if (global.db.data !== null) return
global.db.read = true
await global.db.read().catch(console.error)
global.db.read = null
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {})
}
global.db.chain = chain(global.db.data)
}
loaddatabase()

global.authfile = `${opts._[0] || 'session'}.data.json`
const { state, savestate } = usesinglefileauthstate(global.authfile)

const connectionoptions = {
printqrinterminal: true,
auth: state,
logger: p({ level: 'silent'}),
browser: ['𝑇ℎ𝑒𝑊𝑜𝑙𝑓-𝐵𝑜𝑡-𝑀𝐷-𝑉2','edge','1.0.0'],
msgretrycountermap,
getmessage : async (key) => {
let remotejidxd = key.remotejid.includes(":") ? key.remotejid.split(":")[0] + "@s.whatsapp.net" : key.remotejid
return await store.loadmessage(remotejidxd, key.id)}
}

global.conn = makewasocket(connectionoptions)
conn.isinit = false

if (!opts['test']) {
if (global.db) setinterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.foreach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000)}

if (opts['server']) (await import('./server.js')).default(global.conn, port)

function cleartmp() {
const tmp = [tmpdir(), join(__dirname, './tmp')]
const filename = []
tmp.foreach(dirname => readdirsync(dirname).foreach(file => filename.push(join(dirname, file))))
return filename.map(file => {
const stats = statsync(file)
if (stats.isfile() && (date.now() - stats.mtimems >= 1000 * 60 * 3)) return unlinksync(file) // 3 minutes
return false
})}

async function connectionupdate(update) {
let pp = './src/nuevobot.jpg'
const { connection, lastdisconnect, isnewlogin } = update
if (isnewlogin) conn.isinit = true
const code = lastdisconnect?.error?.output?.statuscode || lastdisconnect?.error?.output?.payload?.statuscode
if (code && code !== disconnectreason.loggedout && conn?.ws.readystate !== connecting) {
console.log(await global.reloadhandler(true).catch(console.error))
global.timestamp.connect = new date
}
if (global.db.data == null) loaddatabase()
if (connection == 'open') {
console.log(chalk.yellow('▣─────────────────────────────···\n│\n│❧ 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴 𝙰𝙻 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 ✅\n│\n▣─────────────────────────────···'))}
}

process.on('uncaughtexception', console.error)

let isinit = true;
let handler = await import('./handler.js')
global.reloadhandler = async function (restatconn) {
try {
const handler = await import(`./handler.js?update=${date.now()}`).catch(console.error)
if (object.keys(handler || {}).length) handler = handler
} catch (e) {
console.error(e)
}
if (restatconn) {
const oldchats = global.conn.chats
try { global.conn.ws.close() } catch { }
conn.ev.removealllisteners()
global.conn = makewasocket(connectionoptions, { chats: oldchats })
isinit = true
}
if (!isinit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsupdate)
conn.ev.off('groups.update', conn.groupsupdate)
conn.ev.off('message.delete', conn.ondelete)
conn.ev.off('connection.update', conn.connectionupdate)
conn.ev.off('creds.update', conn.credsupdate)
}
  
conn.welcome = '*╔══════════════*\n*╟❧ @subject*\n*╠══════════════*\n*╟❧ @user*\n*╟❧ 𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾/𝙰* \n*║*\n*╟❧ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:*\n*╟❧* @desc\n*║*\n*╟❧ 𝙳𝙸𝚂𝙵𝚁𝚄𝚃𝙰 𝚃𝚄 𝙴𝚂𝚃𝙰𝙳𝙸𝙰!!*\n*╚══════════════*'
conn.bye = '*╔══════════════*\n*╟❧ @user*\n*╟❧ 𝙷𝙰𝚂𝚃𝙰 𝙿𝚁𝙾𝙽𝚃𝙾 👋🏻* \n*╚══════════════*'
conn.spromote = '*@user 𝚂𝙴 𝚂𝚄𝙼𝙰 𝙰𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴 𝙰𝙳𝙼𝙸𝙽𝚂!!*'
conn.sdemote = '*@user 𝙰𝙱𝙰𝙽𝙳𝙾𝙽𝙰 𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴 𝙰𝙳𝙼𝙸𝙽𝚂 !!*'
conn.sdesc = '*𝚂𝙴 𝙷𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾 𝙻𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾*\n\n*𝙽𝚄𝙴𝚅𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽:* @desc'
conn.ssubject = '*𝚂𝙴 𝙷𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾*\n*𝙽𝚄𝙴𝚅𝙾 𝙽𝙾𝙼𝙱𝚁𝙴:* @subject'
conn.sicon = '*𝚂𝙴 𝙷𝙰 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙾 𝙻𝙰 𝙵𝙾𝚃𝙾 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾!!*'
conn.srevoke = '*𝚂𝙴 𝙷𝙰 𝙰𝙲𝚃𝚄𝙰𝙻𝙸𝚉𝙰𝙳𝙾 𝙴𝙻 𝙻𝙸𝙽𝙺 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾!!*\n*𝙻𝙸𝙽𝙺 𝙽𝚄𝙴𝚅𝙾:* @revoke'

conn.handler = handler.handler.bind(global.conn)
conn.participantsupdate = handler.participantsupdate.bind(global.conn)
conn.groupsupdate = handler.groupsupdate.bind(global.conn)
conn.ondelete = handler.deleteupdate.bind(global.conn)
conn.connectionupdate = connectionupdate.bind(global.conn)
conn.credsupdate = savestate.bind(global.conn, true)
conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsupdate)
conn.ev.on('groups.update', conn.groupsupdate)
conn.ev.on('message.delete', conn.ondelete)
conn.ev.on('connection.update', conn.connectionupdate)
conn.ev.on('creds.update', conn.credsupdate)
isinit = false
return true
}

const pluginfolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginfilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesinit() {
for (let filename of readdirsync(pluginfolder).filter(pluginfilter)) {
try {
let file = global.__filename(join(pluginfolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesinit().then(_ => object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginfilter(filename)) {
let dir = global.__filename(join(pluginfolder, filename), true)
if (filename in global.plugins) {
if (existssync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
else {
conn.logger.warn(`deleted plugin - '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`new plugin - '${filename}'`)
let err = syntaxerror(readfilesync(dir), filename, {
sourcetype: 'module',
allowawaitoutsidefunction: true
})
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
else try {
const module = (await import(`${global.__filename(dir)}?update=${date.now()}`))
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
} finally {
global.plugins = object.fromentries(object.entries(global.plugins).sort(([a], [b]) => a.localecompare(b)))
}}}
object.freeze(global.reload)
watch(pluginfolder, global.reload)
await global.reloadhandler()
async function _quicktest() {
let test = await promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version'])
].map(p => {
return promise.race([
new promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})}),
new promise(resolve => {
p.on('error', _ => resolve(false))
})])}))
let [ffmpeg, ffprobe, ffmpegwebp, convert, magick, gm, find] = test
let s = global.support = { ffmpeg, ffprobe, ffmpegwebp, convert, magick, gm, find }
object.freeze(global.support)
}
setinterval(async () => {
var a = await cleartmp()
console.log(chalk.cyanbright(`\n▣────────[ 𝙰𝚄𝚃𝙾𝙲𝙻𝙴𝙰𝚁𝚃𝙼𝙿 ]───────────···\n│\n▣─❧ 𝙰𝚁𝙲𝙷𝙸𝚅𝙾𝚂 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙳𝙾𝚂 ✅\n│\n▣────────────────────────────────────···\n`))
}, 180000)
_quicktest()
.then()
.catch(console.error)

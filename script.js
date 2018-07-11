// projects section
var pjs = [{
   title: 'Tamagotchi',
   url: 'p5/Tamagotchi.html',
   img: 'resources/tamagotchi.png',
   type: 'game p5js'
}, {
   title: 'Minesweeper',
   url: 'p5/prato-fiorito.html',
   img: 'resources/minesweeper.png',
   type: 'game p5js'
}, {
   title: 'Rosetta\'s Adventure',
   url: 'p5/Rosetta.html',
   img: 'resources/rosetta.png',
   type: 'animation p5js'
}, {
   title: 'Space 2.0',
   url: 'p5/space2.html',
   img: 'resources/space2.png',
   type: 'game p5js'
}, {
   title: 'Space',
   url: 'p5/space.html',
   img: 'resources/space.png',
   type: 'game p5js'
}, {
   title: 'Week planner',
   url: 'vanillajs/settimana.html',
   img: 'resources/settimana.png',
   type: 'wip vanillajs'
}, {
   title: 'CSS Reference',
   url: 'vanillajs/css_reference.html',
   img: 'resources/css_reference.png',
   type: 'wip vanillajs'
}, {
   title: 'Block youtube\'s users',
   url: 'https://greasyfork.org/en/scripts/11057-block-youtube-users',
   img: 'resources/ytblock.png',
   type: 'userscript jQuery'
}, {
   title: 'AO3: Fic\'s style, Blacklist, Bookmarks',
   url: 'https://greasyfork.org/en/scripts/10944-ao3-fic-s-style-blacklist-bookmarks',
   img: 'resources/ao3style.png',
   type: 'userscript jQuery'
}, {
   title: 'Viki: Subtitles Settings',
   url: 'https://greasyfork.org/en/scripts/40162-viki-subtitles-settings',
   img: 'resources/vikisub.png',
   type: 'userscript vanillajs'
}, {
   title: 'The X-Files',
   url: 'p5/the-x-files.html',
   img: 'resources/thexfiles.png',
   type: 'animation p5js'
}, {
   title: 'APH Germany',
   url: 'p5/aph-germany.html',
   img: 'resources/aphgermany.png',
   type: 'animation p5js'
}, {
   title: 'Clock',
   url: 'p5/orologio.html',
   img: 'resources/clock.png',
   type: 'animation p5js'
}, {
   title: 'Snow over mountains',
   url: 'p5/snow-over-mountains.html',
   img: 'resources/snowovermountains.png',
   type: 'animation p5js'
}];

var pjsParent = document.getElementById('pjs');
var tagsParent = document.getElementById('tags');
var tags = [];

pjs.forEach(function(p) {
   p.type.split(' ').forEach(function(t) {
      if (tags.indexOf(t) === -1) tags.push(t);
   });

   p.element = document.createElement('a');
   p.element.className = 'pj ' + p.type;
   p.element.title = p.title + ' > ' + p.type;
   p.element.href = p.url;
   p.element.target = '_blank';
   p.element.style.background = 'url(' + p.img + ') center center / cover no-repeat';
   p.element.innerHTML = '<p>' + p.title + '</p>';
   pjsParent.appendChild(p.element);
});

tags.sort();
tags = ['[x]'].concat(tags);
tags.forEach(function(t) {
   let tag = document.createElement('span');
   tag.className = 'tag';
   tag.textContent = t;
   tagsParent.appendChild(tag);
});

tagsParent.addEventListener('click', tagSelect, false);
function tagSelect(e) {
   let tag = e.target.textContent;
   if (tags.indexOf(tag) === -1) return;

   let prev = document.querySelector('.tag.selected');
   if (prev) prev.classList.remove('selected');
   if (tag !== tags[0]) e.target.classList.add('selected');

   pjs.forEach(function(p) {
      if (tag === tags[0] || p.element.classList.contains(tag)) {
         p.element.classList.remove('hidden');
      } else if (!p.element.classList.contains('hidden')) {
         p.element.classList.add('hidden');
      }
   });
}

// about section
document.getElementsByTagName('code')[0].innerHTML = '' +
   '<i>var</i> user = {<br>' +
   '  name: \'schegge\',<br>' +
   '  nationality: \'italian\',<br>' +
   '  emanLaer: \'aras\'<br>' +
   '};<br><br>' +
   '<i>if</i> (user.emanLaer) {<br>' +
   '  console.log(\'real name: \' + user.emanLaer.split(\'\').reverse().join(\'\'));<br>' +
   '}';

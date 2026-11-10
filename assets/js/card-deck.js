/* Progressive card decks: original page content remains the source of truth. */
(function () {
    'use strict';

    var serial = 0;
    var focusable = 'a[href],area[href],button,input,select,textarea,iframe,summary,object,embed,[tabindex],audio[controls],video[controls],[contenteditable]';

    function list(nodes) {
        return Array.prototype.slice.call(nodes);
    }

    function button(className, label, text) {
        var element = document.createElement('button');
        element.type = 'button';
        element.className = className;
        element.setAttribute('aria-label', label);
        element.textContent = text;
        return element;
    }

    function hasSelection() {
        return window.getSelection && String(window.getSelection()).length > 0;
    }

    function interactive(element, boundary) {
        while (element && element !== boundary) {
            if (element.nodeType === 1 && (/^(A|BUTTON|INPUT|SELECT|TEXTAREA|LABEL|IFRAME|VIDEO|AUDIO)$/.test(element.tagName) || element.isContentEditable)) {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    }

    function enhance(collection) {
        var projects = collection.getAttribute('data-card-deck') === 'projects';
        var singular = projects ? 'project' : 'certificate';
        var plural = projects ? 'Projects' : 'Certifications';
        var cards = list(collection.querySelectorAll(projects ? 'article' : '.cert-card'));
        if (cards.length < 2) {
            return;
        }

        var id = 'card-deck-' + (++serial);
        var deck = document.createElement('section');
        deck.className = 'card-deck is-enhanced';
        deck.id = id;
        deck.setAttribute('role', 'region');
        deck.setAttribute('aria-roledescription', 'carousel');
        deck.setAttribute('aria-label', plural);

        var instructions = document.createElement('p');
        instructions.className = 'card-deck__instructions';
        instructions.id = id + '-instructions';
        instructions.textContent = 'Use the previous and next buttons or choose a ' + singular + ' from the list. When the card area is focused, use the left and right arrow keys, Home, or End. Swipe horizontally on touch screens. All details are shown in the selected card.';
        deck.appendChild(instructions);

        var controls = document.createElement('div');
        controls.className = 'card-deck__controls';
        var previous = button('card-deck__previous card-deck__arrow', 'Previous ' + singular, '\u2190');
        var next = button('card-deck__next card-deck__arrow', 'Next ' + singular, '\u2192');
        var label = document.createElement('label');
        label.className = 'card-deck__label';
        label.textContent = 'Choose a ' + singular;
        var select = document.createElement('select');
        select.className = 'card-deck__select';
        label.appendChild(select);
        controls.appendChild(previous);
        controls.appendChild(label);
        controls.appendChild(next);
        deck.appendChild(controls);

        var stage = document.createElement('div');
        stage.className = 'card-deck__stage';
        stage.id = id + '-stage';
        stage.tabIndex = 0;
        stage.setAttribute('role', 'group');
        stage.setAttribute('aria-label', plural + ' card area');
        stage.setAttribute('aria-describedby', instructions.id);
        previous.setAttribute('aria-controls', stage.id);
        next.setAttribute('aria-controls', stage.id);
        deck.appendChild(stage);

        var pagination = document.createElement('div');
        pagination.className = 'card-deck__pagination';
        var counter = document.createElement('p');
        counter.className = 'card-deck__counter';
        counter.setAttribute('aria-hidden', 'true');
        var dots = document.createElement('div');
        dots.className = 'card-deck__dots';
        dots.setAttribute('role', 'group');
        dots.setAttribute('aria-label', 'Choose a ' + singular);
        pagination.appendChild(counter);
        pagination.appendChild(dots);
        deck.appendChild(pagination);

        var status = document.createElement('p');
        status.className = 'card-deck__status';
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');
        deck.appendChild(status);

        var anchor = cards[0];
        while (anchor.parentNode !== collection) {
            anchor = anchor.parentNode;
        }
        var marker = document.createComment('Card deck position');
        collection.insertBefore(marker, anchor);
        var oldParents = [];
        var titles = [];
        var savedFocus = [];
        var slides = cards.map(function (card, position) {
            var parent = card.parentElement;
            while (parent && parent !== collection) {
                if (oldParents.indexOf(parent) === -1) {
                    oldParents.push(parent);
                }
                parent = parent.parentElement;
            }
            var heading = card.querySelector('h2,h3');
            var title = heading ? heading.textContent.replace(/\s+/g, ' ').trim() : singular + ' ' + (position + 1);
            titles.push(title);
            var option = document.createElement('option');
            option.value = String(position);
            option.textContent = (position + 1) + '. ' + title;
            select.appendChild(option);

            var slide = document.createElement('div');
            slide.className = 'card-deck__slide';
            slide.id = id + '-slide-' + (position + 1);
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', (position + 1) + ' of ' + cards.length + ': ' + title);
            savedFocus.push(list(card.querySelectorAll(focusable)).map(function (element) {
                return { element: element, tabindex: element.getAttribute('tabindex') };
            }));
            card.classList.add('visible');
            list(card.querySelectorAll('[data-scroll]')).forEach(function (element) {
                element.classList.add('visible');
            });
            slide.appendChild(card);
            stage.appendChild(slide);

            var dot = button('card-deck__dot', 'Show ' + singular + ' ' + (position + 1) + ': ' + title, '');
            dot.setAttribute('aria-controls', slide.id);
            dot.addEventListener('click', function () { show(position, true); });
            dots.appendChild(dot);
            return slide;
        });

        collection.insertBefore(deck, marker);
        marker.parentNode.removeChild(marker);
        oldParents.forEach(function (parent) {
            if (!parent.textContent.trim() && !parent.querySelector('img,a[href],video,audio,iframe,object,embed,svg,canvas,input,button,select,textarea')) {
                parent.hidden = true;
            }
        });
        list(collection.querySelectorAll('hr')).forEach(function (divider) {
            if (!deck.contains(divider)) {
                divider.hidden = true;
            }
        });
        collection.classList.add('has-card-deck');
        collection.classList.add('visible');

        var index = 0;
        function show(position, announce) {
            position = (position + slides.length) % slides.length;
            if (position !== index && slides[index].contains(document.activeElement)) {
                try { stage.focus({ preventScroll: true }); } catch (error) { stage.focus(); }
            }
            index = position;
            var before = (index + slides.length - 1) % slides.length;
            var after = (index + 1) % slides.length;
            slides.forEach(function (slide, number) {
                var active = number === index;
                var state = active ? ' is-active' : number === after ? ' is-next' : number === before && slides.length > 2 ? ' is-previous' : '';
                slide.className = 'card-deck__slide' + state;
                slide.hidden = !state;
                slide.setAttribute('aria-hidden', active ? 'false' : 'true');
                if (active) {
                    slide.removeAttribute('inert');
                } else {
                    slide.setAttribute('inert', '');
                }
                savedFocus[number].forEach(function (entry) {
                    if (!active) {
                        entry.element.setAttribute('tabindex', '-1');
                    } else if (entry.tabindex === null) {
                        entry.element.removeAttribute('tabindex');
                    } else {
                        entry.element.setAttribute('tabindex', entry.tabindex);
                    }
                });
                if (active) {
                    dots.children[number].setAttribute('aria-current', 'true');
                } else {
                    dots.children[number].removeAttribute('aria-current');
                }
            });
            select.value = String(index);
            counter.textContent = (index + 1 < 10 ? '0' : '') + (index + 1) + ' / ' + (slides.length < 10 ? '0' : '') + slides.length;
            if (announce) {
                status.textContent = singular.charAt(0).toUpperCase() + singular.slice(1) + ' ' + (index + 1) + ' of ' + slides.length + ': ' + titles[index];
            }
        }

        previous.addEventListener('click', function () { show(index - 1, true); });
        next.addEventListener('click', function () { show(index + 1, true); });
        select.addEventListener('change', function () { show(Number(select.value), true); });
        deck.addEventListener('keydown', function (event) {
            if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || hasSelection() || (event.target !== stage && event.target !== previous && event.target !== next)) {
                return;
            }
            var key = event.key;
            if (key === 'ArrowLeft') { show(index - 1, true); }
            else if (key === 'ArrowRight') { show(index + 1, true); }
            else if (key === 'Home') { show(0, true); }
            else if (key === 'End') { show(slides.length - 1, true); }
            else { return; }
            event.preventDefault();
        });

        var gesture = null;
        function finishGesture(x, y, time) {
            if (!gesture) { return; }
            var dx = x - gesture.x;
            var dy = y - gesture.y;
            var elapsed = time - gesture.time;
            gesture = null;
            if (!hasSelection() && elapsed < 1000 && Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && Math.abs(dy) < 60) {
                show(index + (dx < 0 ? 1 : -1), true);
            }
        }
        if ('PointerEvent' in window) {
            stage.addEventListener('pointerdown', function (event) {
                gesture = null;
                if (event.pointerType === 'touch' && event.isPrimary && !interactive(event.target, stage) && !hasSelection()) {
                    gesture = { x: event.clientX, y: event.clientY, time: event.timeStamp, id: event.pointerId };
                }
            }, { passive: true });
            document.addEventListener('pointerdown', function (event) {
                if (gesture && event.pointerType === 'touch' && !event.isPrimary) { gesture = null; }
            }, { passive: true });
            document.addEventListener('pointerup', function (event) {
                if (gesture && event.pointerId === gesture.id) { finishGesture(event.clientX, event.clientY, event.timeStamp); }
            }, { passive: true });
            document.addEventListener('pointercancel', function () { gesture = null; }, { passive: true });
        } else {
            stage.addEventListener('touchstart', function (event) {
                gesture = null;
                if (event.touches.length === 1 && !interactive(event.target, stage) && !hasSelection()) {
                    var touch = event.touches[0];
                    gesture = { x: touch.clientX, y: touch.clientY, time: event.timeStamp, id: touch.identifier };
                }
            }, { passive: true });
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length !== 1) { gesture = null; }
            }, { passive: true });
            document.addEventListener('touchend', function (event) {
                if (gesture && event.changedTouches.length && event.changedTouches[0].identifier === gesture.id && event.touches.length === 0) {
                    finishGesture(event.changedTouches[0].clientX, event.changedTouches[0].clientY, event.timeStamp);
                }
            }, { passive: true });
            document.addEventListener('touchcancel', function () { gesture = null; }, { passive: true });
        }
        show(0, false);
    }

    function initialize() {
        list(document.querySelectorAll('[data-card-deck]')).forEach(enhance);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();

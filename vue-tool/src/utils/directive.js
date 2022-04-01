import Vue from 'vue'
import Store from '@/store'

Vue.directive('preventReClick', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 5000)
            }
        })
    }
})

Vue.directive('menuItem', {
    inserted(el, binding) {
        if (!binding.value) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    }
})


Vue.directive('rules', {
    inserted(el, binding) {
        const rules = JSON.parse(window.localStorage.getItem('rules') || '[]')  
        if (rules.indexOf(binding.value) === -1) {
            el.parentNode && el.parentNode.removeChild(el)
        }
        // console.log('el',el);
        // console.log('ebindingl',binding);
        // let rules = []
        // try {
        //     rules = JSON.parse(window.localStorage.getItem('rules'))
        // } catch (e) {}
        // if (binding.value == -1) {
        //     return
        // }
        // if (!rules.includes(binding.value)) {
        //     el.parentNode && el.parentNode.removeChild(el)
        // }
    }
})
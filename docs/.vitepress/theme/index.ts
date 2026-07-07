import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import SidebarAd from './components/SidebarAd.vue';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(SidebarAd),
      'aside-bottom': () => h(SidebarAd),
    });
  },
};

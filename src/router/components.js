const Menu = () => import('@/components/common/menu/TheMenu.vue')
const Header = () => import('@/components/common/header/TheHeader.vue')
const EmployerList = () => import('@/views/system/employers/EmployerList.vue')
const TheAbout = () => import('@/views/system/about/TheAbout.vue')
const TheBatch = () => import('@/views/system/about/TheBatch.vue')

export default {
  'aside-menu': Menu,
  'the-header': Header,
  EmployerList,
  TheAbout,
  TheBatch
}

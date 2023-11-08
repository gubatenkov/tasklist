import ScrollableTaskList from './components/ScrollableTaskList'
import EditTaskPopover from './components/EditTaskPopover'
import BannerImage from './components/BannerImage.tsx'
import InfoBar from './components/InfoBar.tsx'
import Header from './components/Header.tsx'
import TabList from './components/TabList'
import Filters from './components/Filters'

function App() {
  return (
    <div className="relative flex h-screen flex-col items-stretch overflow-hidden">
      <Header />
      <BannerImage />
      <div className="mx-auto mb-3 w-full max-w-[54rem]">
        <InfoBar />
        <TabList />
        <Filters />
        <ScrollableTaskList />
      </div>
      <EditTaskPopover />
    </div>
  )
}

export default App

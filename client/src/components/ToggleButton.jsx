/* eslint-disable react/prop-types */

export const ToggleButton = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 ml-2">
        <p className="text-2xl font-bold">Trending</p>

        <div className="flex rounded-full border border-black overflow-hidden">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    className={`px-4 py-1 font-medium transition-all ${
                    activeTab.value === tab.value
                        ? 'bg-blue-900 text-white'
                        : 'bg-transparent text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    <p className="font-bold text-sm">{tab.name}</p>
                </button>
            ))}
        </div>
    </div>
  );
};


const nexthink = {
  title: "nexthink",
  type: "list",
  navcategory: "menu",
  snippets: [
    {
      item: `devices
    | where device.hardware.manufacturer = "Hewlett-Packard"
    | list device.name, device.entity, device.hardware.model, device.hardware.type, device.operating_system.name, device.hardware.manufacturer, device.hardware.chassis_serial_number, device.hardware.model, device.hardware.product_line`,
      description: `Retrieves all HP devices information`,
      category: `nql`,
      tags: [],
    },
    {
      item: `web.events during past 7d<br/>
    | where application.name == "Zendesk"<br/>
    | summarize usage_duration = duration.sum()/ user.name.count() by ad.department<br/>
    | sort usage_duration desc`,
      description: `Zendesk web app usage duration per department (past 7 days)`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 7d<br/>
        | include device_performance.events during past 7d<br/>
        | compute avg_installed_memory = installed_memory.avg(), used_memory_percentage = used_memory.avg()*100/installed_memory.avg()<br/>
        | where used_memory_percentage > 75`,
      description: `Devices with high memory usage (>75%) during past 7 days`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 7d<br/>
| include device_performance.events during past 7d<br/>
| compute avg_installed_memory = installed_memory.avg(), used_memory_percentage = used_memory.avg()*100/installed_memory.avg()<br/>
| where used_memory_percentage > 75<br/>
| summarize num_devices_mem_upgrade = count() by hardware.manufacturer`,
      description: `Count of memory-upgrade candidates by manufacturer during past 7 days`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices
packages.installed_packages`,
      description: `Devices with installed packages (basic view)`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices <br/>
| with package.installed_packages<br/>
| where package.name == "*Chrome*" and package.version == "108.*"`,
      description: `Devices with specific Chrome version patterns`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices <br/>
| include package.installed_packages<br/>
| where package.name == "*Chrome*"<br/>
| compute number_of_packages_installed = package.count()<br/>
| where number_of_packages_installed == 0`,
      description: `Devices missing Chrome`,
      category: `nql`,
      tags: [],
    },
    {
      item: `execution.crashes during past 7d <br/>
| where binary.name in ["zscaler", "zsaservice.exe"]<br/>
| summarize num_of_crashes = number_of_crashes.sum(), devices_with_crashes = device.count(), version_with_crashes = binary.version.count() by 1d`,
      description: `Zscaler crash reporting (past 7 days)`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 10d<br/>
| include device_performance.boots during past 10d<br/>
| where device_performance.boot.type == full_boot<br/>
| compute number_of_boots_ = number_of_boots.sum()<br/>
| where number_of_boots_ = null`,
      description: `Devices with missing full-boot records`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 30d<br/>
| summarize device_max_memory = hardware.memory.max()`,
      description: `Maximum memory installed across devices (past 30 days)`,
      category: `nql`,
      tags: [],
    },
    {
      item: `web.page_views during past 7d<br/>
| summarize ratio_of_frustrating_page_loads = number_of_page_views.sumif( experience_level = frustrating ) / number_of_page_views.sum()`,
      description: `Ratio of frustrating web page loads`,
      category: `nql`,
      tags: [],
    },
    {
      item: `remote_action.#get_service_information_1.executions during past 7d<br/>
| list device.name, outputs.ServiceInformation`,
      description: `Service information remote action results`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 24h<br/>
| with execution.events during past 24h<br/>
| where application.name == 'Microsoft Teams'<br/>
| where number_of_freezes > 3<br/>
| summarize number_of_devices_with_3_teams_freezes = count()`,
      description: `Devices with >3 Teams freezes (per 15-minute buckets). It might look like it gets all devices with a combined total of at least 3 MS Teams freezes over the day. But in fact, it only gets devices with at least one 15-minute sample where MS Teams had more than 3 freezes (in the same location and with the same connectivity status). If a device experienced 1 freeze every 10 minutes, it would not be counted!`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 24h<br/>
| with execution.events during past 24h<br/>
| where application.name == 'Microsoft Teams'<br/>
| compute freezes_per_device = number_of_freezes.sum()<br/>
| where freezes_per_device > 3<br/>
| summarize devices_with_over_3_freezes = count()`,
      description: `Devices with >3 Teams freezes. To find all devices with over 3 MS Teams freezes in the last 24 hours, you must use the compute keyword and aggregate number_of_freezes per device, before filtering the number of freezes. Look at the correct query below. It will count the devices without any concern about the location, the connectivity status, or whether you're using daily samples or 15-minute samples. `,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices<br/>
| where operating_system.platform == windows and hardware.type == virtual<br/>
| list device.name, operating_system.name, hardware.type`,
      description: `Windows virtual machines`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices<br/>
| where operating_system.platform == windows<br/>
| list operating_system.name, hardware.type`,
      description: `OS name and hardware type for Windows devices`,
      category: `nql`,
      tags: [],
    },
    {
      item: `custom_trend.#windows_migration.snapshots during past 60d<br/>
| where device.hardware.type !in [virtual, null]<br/>
| summarize 
  windows_11_ratio = countif(operating_system_name == "*windows 11*")/count(), 
  total = count() by 1d<br/>
| sort start_time desc`,
      description: `Windows 11 migration custom trend`,
      category: `nql`,
      tags: [],
    },
    {
      item: `execution.events<br/>
| where application.name == '*onedrive*'<br/>
| summarize devices_using_onedrive = device.count()`,
      description: `Devices using OneDrive`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices<br/>
| include execution.crashes<br/>
| compute crash_cnt = device.count()<br/>
| summarize devices_with_crashes = crash_cnt.sum(), total_devices = count()`,
      description: `Devices with application crashes. Good exmaple for single metric gauge chart`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices <br/>
| include device_performance.system_crashes<br/>
| compute devices_with_sys_crashes = device.count()<br/>
| summarize
   without_system_crashes = count() - devices_with_sys_crashes.sum(),
   with_system_crashes = devices_with_sys_crashes.sum()`,
      description: `System crash presence summary. Example of investigation to be used with multi-metric gauge chart`,
      category: `nql`,
      tags: [],
    },
    {
      item: `users<br/>
| include campaign.#welcome.responses<br/>
| compute 
  answered_campaign = user.countif(state == answered), 
  not_answered_campaign = user.countif(state != answered)<br/>
| summarize 
   answered = answered_campaign.sum(),
   not_answered = not_answered_campaign.sum()`,
      description: `Campaign participation summary. Example of investigation to be used with multi-metric gauge chart`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices<br/>
| include execution.events<br/>
| where binary.name in ["firefox", "firefox.exe"]<br/>
| compute 
   num_devices_latest_versions = device.countif( binary.version >= v107),
   num_devices_firefox = device.count()<br/>
| summarize 
   running_latest_versions = num_devices_latest_versions.sum() ,
   not_running_latest_versions = num_devices_firefox.sum() - num_devices_latest_versions.sum()`,
      description: `Firefox latest-version adoption. Example of investigation to be used with multi-metric gauge chart`,
      category: `nql`,
      tags: [],
    },
    {
      item: `web.page_views<br/>
| summarize 
    good_experience = number_of_page_views.sumif(experience_level == good),
    frustrating_experience = number_of_page_views.sumif(experience_level == frustrating)`,
      description: `Good vs frustrating page experience. Example of investigation to be used with multi-metric gauge chart`,
      category: `nql`,
      tags: [],
    },
    {
      item: `devices during past 30d<br/>
| include session.events<br/>
| compute session_user = user.name.last()<br/>
| list device.name, device.entity, device.hardware.model, device.hardware.type, device.operating_system.name, login.last_login_user_name, session_user`,
      description: `Gets devices information for the past 30 days and their last session username`,
      category: `nql`,
      tags: [],
    },
  ],
};

const nexthink_snippets = nexthink.snippets
  .filter((nt) => nt.item.trim().length > 0)
  .map((nt) => {
    return {
      item: nt.item,
      description: nt.description,
      category: `nexthink_${nt.category}`,
      tags: ["nexthink", nt.category, ...nt.tags],
    };
  });

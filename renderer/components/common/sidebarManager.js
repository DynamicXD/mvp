class SidebarManager {
    constructor() {
        this.leftSidebarComponents = {
            'logo': this.loadComponent('leftSidebar/logo'),
            'dashboard': this.loadComponent('leftSidebar/dashboard'),
            'droneConfiguration': this.loadComponent('leftSidebar/droneConfiguration'),
            'trackMission': this.loadComponent('leftSidebar/trackMission'),
            'help': this.loadComponent('leftSidebar/help'),
            'profile': this.loadComponent('leftSidebar/profile'),
            'settings': this.loadComponent('leftSidebar/settings')
        };

        this.rightSidebarComponents = {
            'aiAgent': this.loadComponent('rightSidebar/aiAgent'),
            'telemetry': this.loadComponent('rightSidebar/telemetry')
        };

        this.currentLeftPanel = null;
        this.currentRightPanel = null;
        this.initialize();
    }

    loadComponent(componentPath) {
        // In a real implementation, this would dynamically load components
        // For now, return a placeholder structure
        return {
            html: `<!-- ${componentPath} component -->`,
            css: `/* ${componentPath} styles */`,
            js: null
        };
    }

    initialize() {
        this.createSidebarStructure();
        this.setupEventListeners();
        this.loadCommonStyles();
        
        // Initialize with clean state - only logo visible
        setTimeout(() => {
            console.log('Initializing clean application state...');
            // Ensure sidebars are collapsed initially
            const leftSidebar = document.getElementById('leftSidebar');
            const rightSidebar = document.getElementById('rightSidebar');
            
            if (leftSidebar) {
                leftSidebar.classList.remove('expanded');
                console.log('Left sidebar initialized in collapsed state');
            }
            
            if (rightSidebar) {
                rightSidebar.classList.remove('expanded');
                console.log('Right sidebar initialized in collapsed state');
            }
            
            console.log('Application ready - only logo visible');
        }, 100);
    }

    createSidebarStructure() {
        const leftSidebar = document.createElement('div');
        leftSidebar.className = 'sidebar left-sidebar';
        leftSidebar.id = 'leftSidebar';

        // Create left sidebar icons
        const leftToggle = document.createElement('div');
        leftToggle.className = 'sidebar-toggle left-toggle';
        leftToggle.innerHTML = `
            <div class="sidebar-icons">
                <div class="logo-icon" id="logo-section">
                    <i class="fas fa-drone"></i>
                </div>
                <button class="sidebar-icon" title="Dashboard" data-panel="dashboard">
                    <i class="fas fa-tachometer-alt"></i>
                </button>
                <button class="sidebar-icon" title="Drone Configuration" data-panel="droneConfiguration">
                    <i class="fas fa-cogs"></i>
                </button>
                <button class="sidebar-icon" title="Track Mission" data-panel="trackMission">
                    <i class="fas fa-route"></i>
                </button>
                <button class="sidebar-icon" title="Help" data-panel="help">
                    <i class="fas fa-question-circle"></i>
                </button>
                <button class="sidebar-icon" title="Profile" data-panel="profile">
                    <i class="fas fa-user"></i>
                </button>
                <button class="sidebar-icon" title="Settings" data-panel="settings">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        `;

        const leftContent = document.createElement('div');
        leftContent.className = 'sidebar-content';
        leftContent.id = 'leftSidebarContent';

        leftSidebar.appendChild(leftToggle);
        leftSidebar.appendChild(leftContent);

        // Create right sidebar
        const rightSidebar = document.createElement('div');
        rightSidebar.className = 'sidebar right-sidebar';
        rightSidebar.id = 'rightSidebar';

        const rightToggle = document.createElement('div');
        rightToggle.className = 'sidebar-toggle right-toggle';
        rightToggle.innerHTML = `
            <div class="sidebar-icons">
                <button class="sidebar-icon" title="AI Agent" data-panel="aiAgent">
                    <i class="fas fa-robot"></i>
                </button>
                <button class="sidebar-icon" title="Telemetry" data-panel="telemetry">
                    <i class="fas fa-chart-line"></i>
                </button>
            </div>
        `;

        const rightContent = document.createElement('div');
        rightContent.className = 'sidebar-content';
        rightContent.id = 'rightSidebarContent';

        rightSidebar.appendChild(rightToggle);
        rightSidebar.appendChild(rightContent);

        // Add to main container
        const mainContainer = document.querySelector('.main-container') || document.body;
        mainContainer.insertBefore(leftSidebar, mainContainer.firstChild);
        mainContainer.appendChild(rightSidebar);
    }

    setupEventListeners() {
        // Left sidebar event listeners
        document.addEventListener('click', (e) => {
            const leftIcon = e.target.closest('.left-sidebar .sidebar-icon');
            if (leftIcon) {
                const panel = leftIcon.dataset.panel;
                if (panel) {
                    this.toggleLeftSidebar(panel);
                }
            }

            const rightIcon = e.target.closest('.right-sidebar .sidebar-icon');
            if (rightIcon) {
                const panel = rightIcon.dataset.panel;
                if (panel) {
                    this.toggleRightSidebar(panel);
                }
            }

            // Logo click to show/hide left sidebar
            if (e.target.closest('#logo-section')) {
                this.toggleSidebar('left');
            }
        });
    }

    loadCommonStyles() {
        // Load common CSS if not already loaded
        if (!document.querySelector('link[href*="sidebar.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'components/common/sidebar.css';
            document.head.appendChild(link);
        }
        
        // EMERGENCY CSS INJECTION
        const emergencyCSS = document.createElement('style');
        emergencyCSS.textContent = `
            /* Emergency dashboard visibility CSS */
            .sidebar.expanded {
                width: 320px !important;
            }
            .sidebar.expanded .sidebar-content {
                opacity: 1 !important;
                pointer-events: auto !important;
                display: block !important;
            }
            .dashboard-panel {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: #1a1a1a !important;
                color: white !important;
                height: 100% !important;
                overflow-y: auto !important;
            }
            .panel.active {
                display: flex !important;
            }
            /* Force visibility of all dashboard elements */
            .dashboard-greeting,
            .mission-stats,
            .mission-table-container,
            .bottom-section {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* Emergency drone configuration visibility CSS */
            .drone-config-panel {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: #1a1a1a !important;
                color: white !important;
                height: 100% !important;
                overflow-y: auto !important;
            }
            
            .drone-fleet-section {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                padding: 16px !important;
                background: linear-gradient(135deg, rgba(30, 30, 35, 0.8) 0%, rgba(20, 20, 25, 0.9) 100%) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                margin-bottom: 8px !important;
            }
            
            .drone-grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
                gap: 12px !important;
            }
            
            .drone-card.elegant {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: linear-gradient(145deg, rgba(40, 44, 52, 0.95) 0%, rgba(32, 36, 44, 0.98) 100%) !important;
                border: 1px solid rgba(255, 255, 255, 0.06) !important;
                border-radius: 12px !important;
                padding: 14px !important;
            }
            
            .config-content {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                padding: 15px !important;
                max-height: calc(100vh - 200px) !important;
                overflow-y: auto !important;
            }
            
            .config-section {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                margin-bottom: 25px !important;
                background: #2a2a2a !important;
                border: 1px solid #444 !important;
                border-radius: 8px !important;
                padding: 15px !important;
            }
            
            .add-drone-btn {
                background-color: #2c3e50 !important;
                color: white !important;
                border: none !important;
                padding: 8px 15px !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                font-size: 14px !important;
                font-weight: bold !important;
            }
        `;
        document.head.appendChild(emergencyCSS);
        console.log('Emergency CSS injected for dashboard and drone configuration visibility');
    }

    async toggleLeftSidebar(panelName) {
        const sidebar = document.getElementById('leftSidebar');
        const isExpanded = sidebar.classList.contains('expanded');
        const isSamePanel = this.currentLeftPanel === panelName;

        console.log(`Toggling left sidebar: ${panelName}, isExpanded: ${isExpanded}, isSamePanel: ${isSamePanel}`);

        if (isExpanded && isSamePanel) {
            // Collapse if clicking the same panel
            sidebar.classList.remove('expanded');
            // Remove any extended classes
            sidebar.classList.remove('drone-config-extended', 'track-mission-extended');
            // Reset width to default - remove important styles
            sidebar.style.removeProperty('width');
            sidebar.style.removeProperty('max-width');
            this.currentLeftPanel = null;
            console.log('Collapsed left sidebar, reset width');
        } else {
            // Expand and show panel
            sidebar.classList.add('expanded');
            
            // Remove any existing extended classes first
            sidebar.classList.remove('drone-config-extended', 'track-mission-extended');
            
            // Add specific extended class for certain panels
            if (panelName === 'droneConfiguration') {
                sidebar.classList.add('drone-config-extended');
                console.log('Added drone-config-extended class');
            } else if (panelName === 'trackMission') {
                sidebar.classList.add('track-mission-extended');
                console.log('Added track-mission-extended class');
            }
            
            await this.showLeftPanel(panelName);
            
            // Adjust width after everything is loaded - use setTimeout to ensure DOM is ready
            setTimeout(() => {
                this.adjustExtendedSidebarWidth();
                
                // Additional debugging for drone configuration
                if (panelName === 'droneConfiguration') {
                    console.log('Drone configuration panel should now be visible');
                    const dronePanel = document.querySelector('.drone-config-panel');
                    const addDroneBtn = document.getElementById('addDroneBtn');
                    const droneCards = document.querySelectorAll('.drone-card');
                    
                    console.log('Drone configuration elements check:', {
                        dronePanel: !!dronePanel,
                        addDroneBtn: !!addDroneBtn,
                        droneCards: droneCards.length,
                        sidebarExpanded: sidebar.classList.contains('expanded'),
                        droneConfigExtended: sidebar.classList.contains('drone-config-extended')
                    });
                }
            }, 100);
        }
        
        this.updateActiveIcons('left', panelName);
    }

    async toggleRightSidebar(panelName) {
        const sidebar = document.getElementById('rightSidebar');
        const isExpanded = sidebar.classList.contains('expanded');
        const isSamePanel = this.currentRightPanel === panelName;
    
        if (isExpanded && isSamePanel) {
            sidebar.classList.remove('expanded');
            document.body.classList.remove('right-sidebar-expanded'); // REMOVE class
            this.currentRightPanel = null;
            console.log('Collapsed right sidebar');
        } else {
            sidebar.classList.add('expanded');
            document.body.classList.add('right-sidebar-expanded'); // ADD class
            await this.showRightPanel(panelName);
            console.log('Expanded right sidebar');
        }
    
        // No need to modify left sidebar width here
        this.updateActiveIcons('right', panelName);
    }
    

    async showLeftPanel(panelName) {
        const content = document.getElementById('leftSidebarContent');
        const sidebar = document.getElementById('leftSidebar');
        
        // Ensure the sidebar is expanded
        if (sidebar) {
            sidebar.classList.add('expanded');
        }
        
        await this.loadPanelContent(content, 'leftSidebar', panelName);
        this.currentLeftPanel = panelName;
        
        // Update active icons
        this.updateActiveIcons('left', panelName);
    }

    async showRightPanel(panelName) {
        const content = document.getElementById('rightSidebarContent');
        await this.loadPanelContent(content, 'rightSidebar', panelName);
        this.currentRightPanel = panelName;
    }

    async loadPanelContent(container, sideType, panelName) {
        console.log(`Loading panel: ${panelName} for ${sideType}`);
        
        // Clear existing content
        container.innerHTML = '';

        // Create a div for the panel
        const panelDiv = document.createElement('div');
        panelDiv.className = `panel ${panelName}-panel active`;
        panelDiv.id = `${panelName}-panel`;

        // Load the appropriate HTML content
        await this.loadHTML(panelDiv, `${sideType}/${panelName}/${panelName}.html`);
        this.loadCSS(`${sideType}/${panelName}/${panelName}.css`);
        this.loadJS(`${sideType}/${panelName}/${panelName}.js`);

        container.appendChild(panelDiv);
        
        // Special handling for drone configuration
        if (panelName === 'droneConfiguration') {
            console.log('Drone configuration panel loaded, checking for elements...');
            setTimeout(() => {
                const addDroneBtn = document.getElementById('addDroneBtn');
                const droneDropdown = document.getElementById('droneDropdown');
                const droneCards = document.querySelectorAll('.drone-card');
                
                console.log('Drone configuration elements found:', {
                    addDroneBtn: !!addDroneBtn,
                    droneDropdown: !!droneDropdown,
                    droneCards: droneCards.length
                });
                
                if (addDroneBtn) {
                    console.log('Add drone button found and should be functional');
                } else {
                    console.error('Add drone button not found!');
                }
            }, 100);
        }
        
        // Initialize AIAgent specifically
        if (panelName === 'aiAgent') {
            setTimeout(() => {
                console.log('=== AIAgent Initialization ===');
                console.log('Checking for AIAgent class...');
                console.log('window.AIAgent:', window.AIAgent);
                console.log('typeof AIAgent:', typeof AIAgent);
                console.log('window.aiAgentInstance before:', window.aiAgentInstance);
                
                if (typeof AIAgent !== 'undefined') {
                    try {
                        window.aiAgentInstance = new AIAgent();
                        console.log('AIAgent initialized successfully');
                        console.log('aiAgent instance:', window.aiAgentInstance);
                        console.log('aiAgent waypoints:', window.aiAgentInstance.waypoints);
                        
                    } catch (error) {
                        console.error('Error initializing AIAgent:', error);
                    }
                } else {
                    console.error('AIAgent class not found');
                }
            }, 200);
        }
        
        console.log(`Panel ${panelName} loaded successfully`);
        console.log('Panel content:', panelDiv.innerHTML.substring(0, 200) + '...');
    }

    async loadHTML(container, path) {
        console.log(`Loading HTML from: components/${path}`);
        
        try {
            const response = await fetch(`components/${path}`);
            console.log(`Fetch response status: ${response.status} for ${path}`);
            
            if (response.ok) {
                const html = await response.text();
                console.log(`Loaded HTML successfully from file: ${path}, length: ${html.length}`);
                container.innerHTML = html;
            } else {
                // Fallback to placeholder content
                console.log(`Using fallback HTML for: ${path}`);
                const componentMap = {
                    'leftSidebar/dashboard/dashboard.html': this.getDashboardHTML(),
                    'leftSidebar/droneConfiguration/droneConfiguration.html': this.getDroneConfigHTML(),
                    'leftSidebar/trackMission/trackMission.html': this.getTrackMissionHTML(),
                    'leftSidebar/help/help.html': this.getHelpHTML(),
                    'leftSidebar/profile/profile.html': this.getProfileHTML(),
                    'leftSidebar/settings/settings.html': this.getSettingsHTML(),
                    'rightSidebar/aiAgent/aiAgent.html': this.getAIAgentHTML(),
                    'rightSidebar/telemetry/telemetry.html': this.getTelemetryHTML()
                };
                const fallbackHTML = componentMap[path] || `<div class="panel-placeholder">Component: ${path}</div>`;
                container.innerHTML = fallbackHTML;
                console.log(`Fallback HTML loaded for ${path}, length: ${fallbackHTML.length}`);
            }
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            const errorHTML = `<div class="panel-error">Error loading component: ${path}<br>Error: ${error.message}</div>`;
            container.innerHTML = errorHTML;
        }
    }

    loadCSS(path) {
        const id = `css-${path.replace(/[\/\.]/g, '-')}`;
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = `components/${path}`;
            document.head.appendChild(link);
        }
    }

    loadJS(path) {
        const id = `js-${path.replace(/[\/\.]/g, '-')}`;
        if (!document.getElementById(id)) {
            const script = document.createElement('script');
            script.id = id;
            script.src = `components/${path}`;
            document.head.appendChild(script);
        }
    }

    updateActiveIcons(side, panelName) {
        const sidebar = document.getElementById(`${side}Sidebar`);
        const icons = sidebar.querySelectorAll('.sidebar-icon');
        
        icons.forEach(icon => {
            if (icon.dataset.panel === panelName) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }

    toggleSidebar(side) {
        const sidebar = document.getElementById(`${side}Sidebar`);
        sidebar.classList.toggle('expanded');
    }

    // Placeholder HTML methods (in real implementation, these would be loaded from files)
    getDashboardHTML() {
        return `
            <div class="dashboard-panel" style="height: 100%; background: #1a1a1a; color: white; padding: 20px;">
                <div class="panel-header">
                    <h3><i class="fas fa-tachometer-alt"></i> Dashboard</h3>
                </div>
                <div class="dashboard-content">
                    <!-- Greeting Section -->
                    <div class="dashboard-greeting">
                        <h2>Hello <span id="user-name">User</span>, here's the daily stats.</h2>
                    </div>

                    <!-- Mission Statistics -->
                    <div class="mission-stats">
                        <div class="stat-card ongoing">
                            <div class="stat-header">
                                <span class="stat-label">Ongoing Missions</span>
                            </div>
                            <div class="stat-value" id="ongoing-missions">0</div>
                        </div>
                        <div class="stat-card returning">
                            <div class="stat-header">
                                <span class="stat-label">Returning to Base</span>
                            </div>
                            <div class="stat-value" id="returning-missions">0</div>
                        </div>
                        <div class="stat-card pending">
                            <div class="stat-header">
                                <span class="stat-label">Pending Missions</span>
                            </div>
                            <div class="stat-value" id="pending-missions">0</div>
                        </div>
                        <div class="stat-card completed">
                            <div class="stat-header">
                                <span class="stat-label">Completed missions</span>
                            </div>
                            <div class="stat-value" id="completed-missions">0</div>
                        </div>
                    </div>

                    <!-- Weather Section -->
                    <div class="weather-widget">
                        <div class="section-header">
                            <h4>Weather</h4>
                        </div>
                        <div class="weather-info">
                            <div class="weather-main">
                                <div class="weather-icon">
                                    <i class="fas fa-cloud-sun"></i>
                                </div>
                                <div class="temperature">--°</div>
                            </div>
                            <div class="location">
                                <select id="location-select">
                                    <option>Select Location</option>
                                    <option>Aundh, Pune</option>
                                    <option>Mumbai</option>
                                    <option>Delhi</option>
                                </select>
                            </div>
                            <div class="weather-details">
                                <div class="weather-conditions">
                                    <div class="condition-item">
                                        <i class="fas fa-sun"></i>
                                        <span>Condition: --</span>
                                    </div>
                                    <div class="condition-item">
                                        <i class="fas fa-wind"></i>
                                        <span>Wind speed: -- mph</span>
                                    </div>
                                </div>
                                <div class="risk-assessment">
                                    <div class="risk-level">
                                        <span>Risk Level</span>
                                        <span class="risk-indicator safe">--</span>
                                    </div>
                                    <div class="risk-details">
                                        <span>Risk of Overheating: --%</span>
                                        <span>Humidity: --%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="forecast">
                                <h5>Forecast <span>--</span></h5>
                                <div class="forecast-hours">
                                    <div class="hour-item">
                                        <span>--</span>
                                        <span class="temp">--°</span>
                                    </div>
                                    <div class="hour-item">
                                        <span>--</span>
                                        <span class="temp">--°</span>
                                    </div>
                                    <div class="hour-item">
                                        <span>--</span>
                                        <span class="temp">--°</span>
                                    </div>
                                    <div class="hour-item">
                                        <span>--</span>
                                        <span class="temp">--°</span>
                                    </div>
                                    <div class="hour-item">
                                        <span>--</span>
                                        <span class="temp">--°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDroneConfigHTML() {
        return `
            <div class="drone-config-panel">
                <div class="panel-header">
                    <h3><i class="fas fa-cogs"></i> Drone Configuration</h3>
                    <!-- Add Drone Button and Dropdown -->
                    <div class="add-drone-container">
                        <button id="addDroneBtn" class="add-drone-btn">
                            <i class="fas fa-plus"></i> Add Drone
                        </button>
                        <div id="droneDropdown" class="drone-dropdown hidden">
                            <div class="drone-option" data-drone="hovermax">
                                <img src="../../../../assets/hovermax.png" alt="Hovermax" class="option-img">
                                <span>Hovermax</span>
                            </div>
                            <div class="drone-option" data-drone="phantom-x2">
                                <img src="../../../../assets/panthom x2.png" alt="Phantom X2" class="option-img">
                                <span>Phantom X2</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Elegant Drone List Section -->
                <div class="drone-fleet-section">
                    <div class="section-header">
                        <h4>Active Fleet</h4>
                        <span class="drone-count">2 Drones</span>
                    </div>
                    
                    <div class="drone-grid">
                        <!-- Phantom X2 Card -->
                        <div class="drone-card elegant">
                            <div class="card-header">
                                <div class="drone-avatar">
                                    <img src="../../../../assets/panthom x2.png" alt="Phantom X2" class="drone-img">
                                    <div class="status-badge active">
                                        <div class="status-dot"></div>
                                    </div>
                                </div>
                                <div class="drone-title">
                                    <h5>Phantom X2</h5>
                                    <span class="drone-id">ID: hR49dfY5</span>
                                </div>
                            </div>
                            
                            <div class="card-metrics">
                                <div class="metric">
                                    <div class="metric-icon battery">
                                        <i class="fas fa-battery-three-quarters"></i>
                                    </div>
                                    <div class="metric-info">
                                        <span class="value">78%</span>
                                        <span class="label">Battery</span>
                                    </div>
                                </div>
                                <div class="metric">
                                    <div class="metric-icon signal">
                                        <i class="fas fa-wifi"></i>
                                    </div>
                                    <div class="metric-info">
                                        <span class="value">Strong</span>
                                        <span class="label">Signal</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-specs">
                                <div class="spec-row">
                                    <span>Range</span>
                                    <span class="spec-value">15 km</span>
                                </div>
                                <div class="spec-row">
                                    <span>Payload</span>
                                    <span class="spec-value">2.5 kg</span>
                                </div>
                            </div>
                        </div>

                        <!-- Hovermax Card -->
                        <div class="drone-card elegant">
                            <div class="card-header">
                                <div class="drone-avatar">
                                    <img src="../../../../assets/hovermax.png" alt="Hovermax" class="drone-img">
                                    <div class="status-badge active">
                                        <div class="status-dot"></div>
                                    </div>
                                </div>
                                <div class="drone-title">
                                    <h5>Hovermax</h5>
                                    <span class="drone-id">ID: hR49dfY5</span>
                                </div>
                            </div>
                            
                            <div class="card-metrics">
                                <div class="metric">
                                    <div class="metric-icon battery">
                                        <i class="fas fa-battery-three-quarters"></i>
                                    </div>
                                    <div class="metric-info">
                                        <span class="value">78%</span>
                                        <span class="label">Battery</span>
                                    </div>
                                </div>
                                <div class="metric">
                                    <div class="metric-icon signal">
                                        <i class="fas fa-wifi"></i>
                                    </div>
                                    <div class="metric-info">
                                        <span class="value">Strong</span>
                                        <span class="label">Signal</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-specs">
                                <div class="spec-row">
                                    <span>Range</span>
                                    <span class="spec-value">15 km</span>
                                </div>
                                <div class="spec-row">
                                    <span>Payload</span>
                                    <span class="spec-value">2.5 kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="config-content">
                    <div class="config-section">
                        <h4><i class="fas fa-wifi"></i> Connection Settings</h4>
                        <div class="config-group">
                            <label>Connection Type:</label>
                            <select id="connection-type">
                                <option value="usb">USB</option>
                                <option value="wifi">WiFi</option>
                                <option value="radio">Radio</option>
                                <option value="bluetooth">Bluetooth</option>
                            </select>
                        </div>
                        <div class="config-group">
                            <label>Port/Address:</label>
                            <input type="text" id="connection-address" placeholder="COM3 or 192.168.1.100">
                        </div>
                        <div class="config-group">
                            <label>Baud Rate:</label>
                            <select id="baud-rate">
                                <option value="9600">9600</option>
                                <option value="57600" selected>57600</option>
                                <option value="115200">115200</option>
                                <option value="460800">460800</option>
                            </select>
                        </div>
                    </div>

                    <div class="config-section">
                        <h4><i class="fas fa-sliders-h"></i> Flight Parameters</h4>
                        <div class="config-group">
                            <label>Max Altitude (m):</label>
                            <input type="number" id="max-altitude" value="120" min="1" max="500">
                        </div>
                        <div class="config-group">
                            <label>Max Speed (m/s):</label>
                            <input type="number" id="max-speed" value="15" min="1" max="25" step="0.5">
                        </div>
                        <div class="config-group">
                            <label>Return Home Altitude (m):</label>
                            <input type="number" id="rth-altitude" value="50" min="10" max="200">
                        </div>
                        <div class="config-group">
                            <label>Auto Land Battery (%):</label>
                            <input type="number" id="auto-land-battery" value="20" min="10" max="50">
                        </div>
                    </div>

                    <div class="config-section">
                        <h4><i class="fas fa-shield-alt"></i> Safety Settings</h4>
                        <div class="config-group checkbox-group">
                            <input type="checkbox" id="geofence" checked>
                            <label for="geofence">Enable Geofence</label>
                        </div>
                        <div class="config-group checkbox-group">
                            <input type="checkbox" id="obstacle-avoidance" checked>
                            <label for="obstacle-avoidance">Obstacle Avoidance</label>
                        </div>
                        <div class="config-group checkbox-group">
                            <input type="checkbox" id="auto-rth" checked>
                            <label for="auto-rth">Auto Return Home</label>
                        </div>
                        <div class="config-group checkbox-group">
                            <input type="checkbox" id="motor-cutoff">
                            <label for="motor-cutoff">Emergency Motor Cutoff</label>
                        </div>
                    </div>

                    <div class="config-actions">
                        <button class="config-btn save-btn" id="save-config">
                            <i class="fas fa-save"></i>
                            Save Configuration
                        </button>
                        <button class="config-btn load-btn" id="load-config">
                            <i class="fas fa-upload"></i>
                            Load Configuration
                        </button>
                        <button class="config-btn reset-btn" id="reset-config">
                            <i class="fas fa-undo"></i>
                            Reset to Default
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getTrackMissionHTML() {
        return `
            <div class="panel-header">
                <h3><i class="fas fa-route"></i> Track Mission</h3>
            </div>
            <div class="mission-content">
                <!-- Mission Data Table -->
                <div class="mission-table-container">
                    <h4><i class="fas fa-table"></i> Mission Data</h4>
                    <table class="mission-table">
                        <thead>
                            <tr>
                                <th>Mission ID</th>
                                <th>Mission name</th>
                                <th>Status</th>
                                <th>Payload</th>
                                <th>Battery</th>
                                <th>Arrival Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="mission-table-body">
                            <!-- Mission data will be populated here -->
                        </tbody>
                    </table>
                </div>
                <p>Track Mission component loaded successfully!</p>
            </div>
        `;
    }

    getHelpHTML() {
        return `
            <div class="panel-header">
                <h3><i class="fas fa-question-circle"></i> Help & Support</h3>
            </div>
            <div class="help-content">
                <p>Help component loaded successfully!</p>
            </div>
        `;
    }

    getProfileHTML() {
        return `
            <div class="panel-header">
                <h3><i class="fas fa-user"></i> User Profile</h3>
            </div>
            <div class="profile-content">
                <p>Profile component loaded successfully!</p>
            </div>
        `;
    }

    getSettingsHTML() {
        return `
            <div class="panel-header">
                <h3><i class="fas fa-cog"></i> Settings</h3>
            </div>
            <div class="settings-content">
                <p>Settings component loaded successfully!</p>
            </div>
        `;
    }

    getAIAgentHTML() {
        return `
            <div class="ai-agent-panel">
                <!-- Model Selection Header -->
                <div class="model-header">
                    <div class="model-options">
                        <div class="model-option active" data-model="online">
                            <div class="model-icon">
                                <i class="fas fa-cloud"></i>
                            </div>
                            <div class="model-details">
                                <span class="model-name">Online</span>
                                <span class="model-desc">Fast & Accurate</span>
                            </div>
                        </div>
                        <div class="model-option" data-model="offline">
                            <div class="model-icon">
                                <i class="fas fa-desktop"></i>
                            </div>
                            <div class="model-details">
                                <span class="model-name">Offline</span>
                                <span class="model-desc">Slow & Less Accurate</span>
                            </div>
                        </div>
                    </div>
                    <div class="model-status">
                        <div class="status-dot online"></div>
                        <span class="status-text">Online Model Ready</span>
                    </div>
                </div>

                <!-- Waypoints Section -->
                <div class="waypoints-section">
                    <div class="section-header">
                        <h4><i class="fas fa-map-marker-alt"></i> Waypoints</h4>
                    </div>
                    <div class="waypoints-container">
                        <div class="waypoints-list" id="waypoints-list">
                            <!-- Waypoints will be populated here -->
                        </div>
                        <div class="empty-state" id="empty-waypoints">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>No waypoints created yet</p>
                            <span class="hint">Use the drawing tools on the map to create waypoints</span>
                        </div>
                    </div>
                </div>

                <!-- Chat Section -->
                <div class="chat-section">
                    <div class="chat-messages" id="chat-messages">
                        <div class="message ai-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <div class="message-text">
                                    Hello! I'm your AI assistant for drone operations.
                                </div>
                                <div class="message-text">
                                    You can reference waypoints by typing <code>@waypoint-name</code> in your messages.
                                </div>
                                <div class="message-text">
                                    Use the drawing tools on the map to create new waypoints!
                                </div>
                                <div class="message-time">Just now</div>
                            </div>
                        </div>
                    </div>

                    <!-- Typing Indicator -->
                    <div class="typing-indicator" id="typing-indicator" style="display: none;">
                        <div class="message ai-message">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-content">
                                <div class="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="chat-input-area">
                        <div class="input-container">
                            <div class="autocomplete-dropdown" id="autocomplete-dropdown"></div>
                            <input type="text" 
                                   class="chat-input" 
                                   id="chat-input" 
                                   placeholder="Type @ to reference waypoints...">
                            <button class="send-button" id="send-button">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Waypoint Save Modal -->
                <div class="modal-overlay" id="waypoint-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Save Waypoint</h3>
                        </div>
                        <div class="modal-body">
                            <p>Give your waypoint a name:</p>
                            <input type="text" 
                                   class="waypoint-input" 
                                   id="waypoint-input" 
                                   placeholder="e.g., home, landing-zone, survey-area">
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" id="cancel-waypoint">Cancel</button>
                            <button class="btn btn-primary" id="save-waypoint">Save Waypoint</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getTelemetryHTML() {
        return `
            <div class="panel-header">
                <h3><i class="fas fa-chart-line"></i> Telemetry</h3>
            </div>
            <div class="telemetry-content">
                <p>Telemetry component loaded successfully!</p>
            </div>
        `;
    }

    adjustExtendedSidebarWidth() {
        const leftSidebar = document.getElementById('leftSidebar');
        const rightSidebar = document.getElementById('rightSidebar');
        
        console.log('adjustExtendedSidebarWidth called');
        console.log('leftSidebar:', leftSidebar);
        console.log('rightSidebar:', rightSidebar);
        
        if (!leftSidebar || !leftSidebar.classList.contains('expanded')) {
            console.log('Left sidebar not expanded, returning');
            return;
        }

        const isExtended = leftSidebar.classList.contains('drone-config-extended') || 
                          leftSidebar.classList.contains('track-mission-extended');
        
        console.log('isExtended:', isExtended);
        
        if (isExtended) {
            const rightSidebarExpanded = rightSidebar && rightSidebar.classList.contains('expanded');
            
            console.log('rightSidebarExpanded:', rightSidebarExpanded);
            
            let newWidth;
            if (rightSidebarExpanded) {
                // When right sidebar is expanded, it takes 320px total
                newWidth = `calc(100vw - 320px)`;
            } else {
                // When right sidebar is collapsed, it takes 50px total
                newWidth = `calc(100vw - 50px)`;
            }
            
            console.log('Setting width to:', newWidth);
            
            // Use setProperty with important priority to override CSS
            leftSidebar.style.setProperty('width', newWidth, 'important');
            leftSidebar.style.setProperty('max-width', 'none', 'important');
            
            console.log('Applied width:', leftSidebar.style.width);
            console.log('Computed style width:', getComputedStyle(leftSidebar).width);
        }
    }
}

// Initialize the sidebar manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarManager = new SidebarManager();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SidebarManager;
} 
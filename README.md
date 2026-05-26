# OfferSense Frontend 📊

A modern React-based analytics dashboard for campaign performance, customer segmentation, and offer effectiveness tracking.

## 🚀 Features

- **Dashboard**: Real-time KPI metrics with interactive charts
- **Campaign Performance**: Detailed campaign analytics with filtering and sorting
- **Customer Segments**: Demographic analysis and segment distribution
- **Offer Effectiveness**: Performance matrix and ROI analysis
- **Data Visualization**: Interactive charts using Recharts
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Export Functionality**: Download data as CSV files
- **Error Handling**: Robust error states with retry mechanisms

## 🛠️ Tech Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization library
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manikswamy3311/offersense-frontend.git
   cd offersense-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
offersense-frontend/
├── src/
│   ├── assets/
│   │   └── styles.css          # Global styles and CSS variables
│   ├── components/
│   │   ├── ChartCard.js        # Reusable chart container
│   │   ├── ErrorMessage.js     # Error display component
│   │   ├── KPIBox.js           # KPI metric card
│   │   ├── LoadingSpinner.js   # Loading state component
│   │   └── Navbar.js           # Navigation bar
│   ├── pages/
│   │   ├── CampaignPerformance.js  # Campaign analytics page
│   │   ├── CustomerSegments.js     # Customer segment page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   └── OfferEffectiveness.js   # Offer analytics page
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Key Components

### KPIBox
Displays key performance indicators with optional trend indicators.
```jsx
<KPIBox
  title="Total Impressions"
  value="1.2M"
  trend="+12.5%"
  bgColor="#e3f2fd"
/>
```

### ChartCard
Wrapper for charts with title and description.
```jsx
<ChartCard title="Performance Trends" description="Last 30 days">
  {/* Chart component */}
</ChartCard>
```

### LoadingSpinner
Shows loading state with custom message.
```jsx
<LoadingSpinner message="Loading data..." />
```

### ErrorMessage
Displays errors with retry functionality.
```jsx
<ErrorMessage message="Failed to load" onRetry={fetchData} />
```

## 🔌 API Integration

The app uses a service layer (`src/services/api.js`) for API calls:

- `getKPIs()` - Dashboard metrics
- `getTrendData()` - Time-series data
- `getCampaignData()` - Campaign performance
- `getCustomerSegments()` - Segment information
- `getOfferEffectiveness()` - Offer metrics

**Note**: Currently uses mock data with fallback when API is unavailable.

## 📊 Features by Page

### Dashboard
- 6 KPI boxes with key metrics
- Line chart for performance trends
- Bar chart for target comparison
- Real-time data refresh

### Campaign Performance
- Sortable data table with 10+ campaigns
- Search and filter functionality
- Bar chart comparing top campaigns
- Pie chart for budget distribution
- CSV export feature

### Customer Segments
- 6 segment cards with detailed metrics
- Pie chart for customer distribution
- Bar chart for revenue comparison
- Age group demographics
- Channel preference analysis
- CSV export feature

### Offer Effectiveness
- Performance matrix (2x2 grid)
- Top 3 performers showcase
- Sortable offer table
- Search and multi-filter system
- Bar chart for redemptions
- Pie chart for offer type distribution
- CSV export feature

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Environment Variables

Create a `.env` file in the root directory (if needed):

```env
VITE_API_BASE_URL=your_api_url_here
```

## 🐛 Troubleshooting

**Issue**: Charts not displaying
- **Solution**: Ensure `recharts` is installed: `npm install recharts`

**Issue**: Routing not working
- **Solution**: Check that `react-router-dom` is installed: `npm install react-router-dom`

**Issue**: Build fails
- **Solution**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- **Manikswamy** - [@manikswamy3311](https://github.com/manikswamy3311)

## 📧 Contact

For questions or support, please contact: manikswamy3311@gmail.com

---

**Made with ❤️ using React + Vite**

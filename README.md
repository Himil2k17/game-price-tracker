🎮 Game Price Tracker        
React + Node + RAWG + CheapShark    

A modern gaming discovery and price-comparison web app where users can:   
 ✔ Browse trending, top-rated, newly released & upcoming PC games   
 ✔ View real game details — trailers, screenshots, release dates, genres & platforms    
 ✔ Check live PC prices from Steam / Epic / verified stores    
 ✔ Search instantly with smart filtering   
 ✔ Browse smoothly with infinite scrolling    
 ✔ Enjoy a Steam-style dark UI   

Built as a learning project + real-world portfolio app.
______________________________________________________________________________________________________________________________________________________________
🏗️ Architecture Overview
<img width="866" height="831" alt="art" src="https://github.com/user-attachments/assets/d8332073-2eef-43b0-a74e-5fdca32d5355" />
______________________________________________________________________________________________________________________________________________________________

🌍 Tech Stack   
Frontend   
•	⚛️ React + Vite    
•	🎨 Custom CSS (Steam-style UI)    
•	♻️ Infinite Scroll (Intersection Observer)    
•	🔍 Debounced Search    
•	📱 Fully Responsive     

Backend    
•	🟢 Node.js + Express     
•	💰 CheapShark API (real store prices)    
•	🧠 Smart fallback matching     
•	🔐 API Proxy Layer     
•	🚀 MongoDB Ready (future features: wishlist / price history)     

External APIs    
•	🎮 RAWG — Games, trailers, screenshots, metadata      
•	💸 CheapShark — Real-time PC store deals       
________________________________________________________________________________________________________________________________________________________________

✨ Core Features      
🏠 Home Page     
•	Trending PC Games     
•	Top Rated Games      
•	New Releases (Month / Year – Steam & Epic only)      
•	Upcoming Titles     
•	Clean dark modern layout      
________________________________________________________________________________________________________________________________________________________________

🎮 Games Page       
•	Infinite scroll browsing       
•	Smooth Steam-like UX      
•	Instant search      
•	Infinite scroll auto-disables while searching       
•	Click → Go to Game Details       
________________________________________________________________________________________________________________________________________________________________

📝 Game Details Page      
Includes:      
•	🎥 Trailer (auto scroll to top)        
•	🖼️ Screenshots + full lightbox viewer      
•	⌨️ Keyboard navigation (Esc / ← / →)      
•	🕹️ Platforms     
•	🏷️ Genres       
•	📅 Release Date + COMING SOON badge     
•	💵 Real-time PC price comparison     
•	✔ Steam & Epic supported      
•	❌ Price hidden for unreleased games    
Also includes:      
•	🔙 Smart back button (clears search)      
________________________________________________________________________________________________________________________________________________________________
    
🔮 Upcoming Page      
•	Shows only unreleased games     
•	Steam / Epic supported     
•	Infinite scroll browsing      
•	Full details available       
________________________________________________________________________________________________________________________________________________________________

🔌 Environment Variables     
  Client .env    
<img width="790" height="139" alt="code1" src="https://github.com/user-attachments/assets/9b210798-5312-44b8-b130-618e20e0007e" />     
______________________________________________________________________________________________________________________________________________________________

🚀 Running Locally     
  Frontend      
<img width="814" height="172" alt="code2" src="https://github.com/user-attachments/assets/51e7d00a-f4c1-4ba6-b727-3cea947e0821" />  

Runs at:    
<img width="729" height="104" alt="code3" src="https://github.com/user-attachments/assets/ac28996b-0cf8-4a70-ba93-473975b09af4" />    
________________________________________________________________________________________________________________________________________________________________

Backend   
<img width="612" height="110" alt="code4" src="https://github.com/user-attachments/assets/0cb2e9fa-90e4-4692-990c-0bf492cd3565" />   

Runs at:    
<img width="534" height="90" alt="code5" src="https://github.com/user-attachments/assets/a75918b6-7758-4324-8aa5-cb1e9f8c9f0b" />
________________________________________________________________________________________________________________________________________________________________

🧠 Smart UX Decisions      
✔ Infinite scroll auto disables during search      
✔ Search clears when entering Game Details        
✔ Prevents duplicate titles across sections       
✔ Only PC stores shown       
✔ Only games with real prices shown       
✔ Avoids console-exclusive games         
✔ RAWG rate-safe logic       
✔ Backend ready for caching      
________________________________________________________________________________________________________________________________________________________________

🔥 Future Enhancements      
•	⭐ User Wishlist (MongoDB)         
•	📉 Price History Graph      
•	📬 Email Price Drop Alerts        
•	🎮 Steam / Epic badges on cards      
•	🏷 Store Filters      
•	🌍 Region Pricing     
•	☁ Deployment (Vercel + Railway)      
________________________________________________________________________________________________________________________________________________________________

💡 Learning Achievements      
•	React real-world architecture      
•	API integration best practices      
•	Backend API proxying      
•	Search + infinite scroll combo logic      
•	Game marketplace style UX decisions     
•	Robust error handling strategy       
________________________________________________________________________________________________________________________________________________________________

📸 Screenshots   

  🏠 Home Page     
Modern Steam-style layout with Trending, Top Rated, New Releases and Upcoming sections.         
<img width="1909" height="868" alt="home" src="https://github.com/user-attachments/assets/177ba18d-aaa3-481b-ac5f-975dd478ee0f" />      
________________________________________________________________________________________________________________________________________________________________

🎮 Games Page (Infinite Scroll + Search)      
Browse thousands of games with smooth infinite scroll. Search instantly filters results.       
<img width="1025" height="727" alt="games" src="https://github.com/user-attachments/assets/c6907d77-d799-41d4-968b-83bf679e14bd" />   
________________________________________________________________________________________________________________________________________________________________

🔍 Search Experience     
Clean and responsive. Search resets automatically after viewing details.      
<img width="1023" height="754" alt="search" src="https://github.com/user-attachments/assets/a35d21cc-4165-40b9-9b89-878b503797c7" />    
________________________________________________________________________________________________________________________________________________________________

📝 Game Details — Overview       
<img width="1025" height="762" alt="details1" src="https://github.com/user-attachments/assets/1bb3766d-40e9-4576-9a1d-8d1226e9a44d" />     
________________________________________________________________________________________________________________________________________________________________

🎥 Trailer     
<img width="1019" height="747" alt="trailer" src="https://github.com/user-attachments/assets/d8f080ed-4256-4bfb-aca3-9c568808d952" />
________________________________________________________________________________________________________________________________________________________________

🎨 Screenshots + Prices       
<img width="613" height="333" alt="details2" src="https://github.com/user-attachments/assets/b2f8003d-bb55-4a72-a65d-0403d85b3d0f" />     
________________________________________________________________________________________________________________________________________________________________

🖼 Lightbox + Keyboard Navigation        
ESC to close    
• ← → to navigate     
• Smooth overlay blur        
<img width="1027" height="738" alt="lightbox" src="https://github.com/user-attachments/assets/611efd0e-1d7c-4013-80cb-fda9d74ef03f" />     
________________________________________________________________________________________________________________________________________________________________

🔮 Upcoming Games      
<img width="1022" height="757" alt="upcoming" src="https://github.com/user-attachments/assets/65008a9a-ff27-4b29-b9b9-a23097449bf2" />    
________________________________________________________________________________________________________________________________________________________________

💸 Real PC Price Comparison      
Live deals including:       
✔ Best price       
✔ Normal price       
✔ Store logos       
✔ Discounts %        
✔ Steam / Epic links       
<img width="954" height="354" alt="steamepic" src="https://github.com/user-attachments/assets/c36019f1-9cab-45b6-8adb-b98193cff5e3" />        
________________________________________________________________________________________________________________________________________________________________

📱 Responsive      
Optimized for desktop, tablet and mobile.       
________________________________________________________________________________________________________________________________________________________________

🧑💻 Author       
Built as a personal learning + portfolio project.       
Passionate about gaming & full-stack development 🎮💻      
________________________________________________________________________________________________________________________________________________________________
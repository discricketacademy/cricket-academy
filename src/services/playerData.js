// Mock Player Database structure
export const MOCK_PLAYERS = [
    {
        id: 'p1',
        fullName: 'Sachin Tendulkar Perera',
        callName: 'Sachin',
        role: 'Batsman',
        dob: '2008-04-24',
        age: '16',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Placeholder
        badges: ['Top Performer'],
        battingStats: { mat: 15, inn: 14, no: 3, runs: 654, hs: 112, avg: 59.45, sr: 85.2, hundreds: 2, fifties: 4 },
        bowlingStats: { mat: 15, inn: 5, overs: 12.0, maidens: 1, runs: 75, wkts: 4, bbi: '2/15', avg: 18.75, econ: 6.25, sr: 18.0, fiveW: 0 }
    },
    {
        id: 'p2',
        fullName: 'Lasith Malinga De Silva',
        callName: 'Lasith',
        role: 'Bowler',
        dob: '2007-08-28',
        age: '17',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm fast',
        imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Rising Star'],
        battingStats: { mat: 14, inn: 8, no: 4, runs: 85, hs: 34, avg: 21.25, sr: 115.5, hundreds: 0, fifties: 0 },
        bowlingStats: { mat: 14, inn: 14, overs: 68.5, maidens: 8, runs: 345, wkts: 28, bbi: '5/22', avg: 12.32, econ: 5.01, sr: 14.7, fiveW: 2 }
    },
    {
        id: 'p3',
        fullName: 'Kumar Sangakkara Fernando',
        callName: 'Kumar',
        role: 'All-rounder',
        dob: '2009-10-27',
        age: '15',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Slow left-arm orthodox',
        imageUrl: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Best All-Rounder'],
        battingStats: { mat: 16, inn: 15, no: 2, runs: 540, hs: 88, avg: 41.53, sr: 78.5, hundreds: 0, fifties: 6 },
        bowlingStats: { mat: 16, inn: 12, overs: 45.0, maidens: 5, runs: 180, wkts: 15, bbi: '4/18', avg: 12.00, econ: 4.00, sr: 18.0, fiveW: 0 }
    },
    {
        id: 'p4',
        fullName: 'Mahela Jayawardene Silva',
        callName: 'Mahela',
        role: 'Batsman',
        dob: '2010-05-12',
        age: '14',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium',
        imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Top Performer'],
        battingStats: { mat: 10, inn: 10, no: 1, runs: 412, hs: 105, avg: 45.77, sr: 82.1, hundreds: 1, fifties: 3 },
        bowlingStats: { mat: 10, inn: 2, overs: 5.0, maidens: 0, runs: 45, wkts: 1, bbi: '1/20', avg: 45.0, econ: 9.0, sr: 30.0, fiveW: 0 }
    },
    {
        id: 'p5',
        fullName: 'Muttiah Muralitharan Dias',
        callName: 'Murali',
        role: 'Bowler',
        dob: '2008-01-15',
        age: '16',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Rising Star'],
        battingStats: { mat: 18, inn: 12, no: 6, runs: 110, hs: 22, avg: 18.33, sr: 105.4, hundreds: 0, fifties: 0 },
        bowlingStats: { mat: 18, inn: 18, overs: 85.0, maidens: 12, runs: 310, wkts: 35, bbi: '6/15', avg: 8.85, econ: 3.64, sr: 14.5, fiveW: 3 }
    },
    {
        id: 'p6',
        fullName: 'Angelo Mathews Bandara',
        callName: 'Angelo',
        role: 'All-rounder',
        dob: '2007-06-02',
        age: '17',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm fast-medium',
        imageUrl: 'https://images.unsplash.com/photo-1518605368461-1e125228113e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Captain Material'],
        battingStats: { mat: 20, inn: 18, no: 5, runs: 680, hs: 94, avg: 52.3, sr: 75.8, hundreds: 0, fifties: 7 },
        bowlingStats: { mat: 20, inn: 15, overs: 60.5, maidens: 4, runs: 290, wkts: 18, bbi: '3/25', avg: 16.1, econ: 4.76, sr: 20.2, fiveW: 0 }
    },
    {
        id: 'p7',
        fullName: 'Sanath Jayasuriya Kumara',
        callName: 'Sanath',
        role: 'Batsman',
        dob: '2010-02-18',
        age: '14',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Slow left-arm orthodox',
        imageUrl: 'https://images.unsplash.com/photo-1521415663737-01314d18ecfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Power Hitter'],
        battingStats: { mat: 12, inn: 12, no: 1, runs: 550, hs: 135, avg: 50.0, sr: 135.5, hundreds: 1, fifties: 4 },
        bowlingStats: { mat: 12, inn: 8, overs: 20.0, maidens: 1, runs: 120, wkts: 6, bbi: '2/10', avg: 20.0, econ: 6.0, sr: 20.0, fiveW: 0 }
    },
    {
        id: 'p8',
        fullName: 'Chaminda Vaas Rupasinghe',
        callName: 'Vaasy',
        role: 'Bowler',
        dob: '2008-11-20',
        age: '16',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Left-arm fast-medium',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['New Ball Specialist'],
        battingStats: { mat: 14, inn: 8, no: 5, runs: 120, hs: 45, avg: 40.0, sr: 95.0, hundreds: 0, fifties: 0 },
        bowlingStats: { mat: 14, inn: 14, overs: 55.0, maidens: 10, runs: 220, wkts: 22, bbi: '4/12', avg: 10.0, econ: 4.0, sr: 15.0, fiveW: 0 }
    },
    {
        id: 'p9',
        fullName: 'Aravinda De Silva Peiris',
        callName: 'Aravinda',
        role: 'Batsman',
        dob: '2009-03-30',
        age: '15',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        imageUrl: 'https://images.unsplash.com/photo-1518605368461-1e125228113e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Technique Master'],
        battingStats: { mat: 15, inn: 14, no: 2, runs: 600, hs: 120, avg: 50.0, sr: 80.0, hundreds: 1, fifties: 5 },
        bowlingStats: { mat: 15, inn: 3, overs: 8.0, maidens: 0, runs: 50, wkts: 1, bbi: '1/15', avg: 50.0, econ: 6.25, sr: 48.0, fiveW: 0 }
    },
    {
        id: 'p10',
        fullName: 'Rangana Herath Gunaratne',
        callName: 'Rangana',
        role: 'Bowler',
        dob: '2007-12-05',
        age: '17',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Slow left-arm orthodox',
        imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Spin Wizard'],
        battingStats: { mat: 16, inn: 10, no: 4, runs: 60, hs: 15, avg: 10.0, sr: 65.0, hundreds: 0, fifties: 0 },
        bowlingStats: { mat: 16, inn: 16, overs: 70.0, maidens: 15, runs: 180, wkts: 30, bbi: '5/18', avg: 6.0, econ: 2.57, sr: 14.0, fiveW: 2 }
    },
    {
        id: 'p11',
        fullName: 'Dinesh Chandimal Rathnayake',
        callName: 'Dinesh',
        role: 'Wicket-Keeper/Batsman',
        dob: '2009-07-22',
        age: '15',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'None',
        imageUrl: 'https://images.unsplash.com/photo-1521415663737-01314d18ecfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Safe Hands'],
        battingStats: { mat: 14, inn: 12, no: 2, runs: 450, hs: 85, avg: 45.0, sr: 75.0, hundreds: 0, fifties: 4 },
        bowlingStats: { mat: 0, inn: 0, overs: 0, maidens: 0, runs: 0, wkts: 0, bbi: '-', avg: 0, econ: 0, sr: 0, fiveW: 0 }
    },
    {
        id: 'p12',
        fullName: 'Kusal Mendis Abeysekera',
        callName: 'Kusal',
        role: 'Batsman',
        dob: '2010-09-14',
        age: '14',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm legbreak',
        imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        badges: ['Aggressive Opener'],
        battingStats: { mat: 11, inn: 11, no: 0, runs: 380, hs: 90, avg: 34.5, sr: 110.0, hundreds: 0, fifties: 3 },
        bowlingStats: { mat: 11, inn: 1, overs: 2.0, maidens: 0, runs: 20, wkts: 0, bbi: '0/20', avg: 0, econ: 10.0, sr: 0, fiveW: 0 }
    }
];

// The Live Google Sheet JSON Endpoint (Apps Script Web App)
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbw6cy11WKJSoX7jgkl_0lQGb9kVV1JzSy8SCxlKGshRmrxs9U0Ph0K5cPXIKb8uIDTS/exec";

export const fetchPlayers = async () => {
    try {
        const response = await fetch(GOOGLE_SHEET_API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const rawData = await response.json();

        // Map the flat Google Sheet data into the nested structure our UI expects
        return rawData.map(player => ({
            id: player.id || Math.random().toString(),
            fullName: player.fullName,
            callName: player.callName,
            role: player.role,
            dob: player.dob,
            age: player.age || (player.dob ? (new Date().getFullYear() - new Date(player.dob).getFullYear()) : 'N/A'),
            battingStyle: player.battingStyle,
            bowlingStyle: player.bowlingStyle,
            imageUrl: player.imageUrl || 'https://via.placeholder.com/500?text=No+Image',
            // Default split for badges column if provided
            badges: player.badges ? player.badges.toString().split(',').map(b => b.trim()) : [],
            battingStats: {
                mat: Number(player.bat_mat) || 0,
                inn: Number(player.bat_inn) || 0,
                no: Number(player.bat_no) || 0,
                runs: Number(player.bat_runs) || 0,
                hs: Number(player.bat_hs) || 0,
                avg: Number(player.bat_avg) || 0,
                sr: Number(player.bat_sr) || 0,
                hundreds: Number(player.bat_100s) || 0,
                fifties: Number(player.bat_50s) || 0
            },
            bowlingStats: {
                mat: Number(player.bowl_mat) || 0,
                inn: Number(player.bowl_inn) || 0,
                overs: Number(player.bowl_overs) || 0,
                maidens: Number(player.bowl_maidens) || 0,
                runs: Number(player.bowl_runs) || 0,
                wkts: Number(player.bowl_wkts) || 0,
                bbi: player.bowl_bbi || "0/0",
                avg: Number(player.bowl_avg) || 0,
                econ: Number(player.bowl_econ) || 0,
                sr: Number(player.bowl_sr) || 0,
                fiveW: Number(player.bowl_5w) || 0
            }
        }));
    } catch (error) {
        console.warn("Failed to fetch from Google Sheet, falling back to mock data.", error);
        return MOCK_PLAYERS;
    }
};

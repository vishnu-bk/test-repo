
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

interface SetData {
    weight: number;
    reps: number;
}

interface Workout {
    id: number;
    timestamp: string;
    name: string;
    type: 'Strength' | 'Cardio';
    date: string;
    sets?: SetData[];
    duration?: number;
    calories: number;
}

interface Exercise {
    name: string;
    type: 'Strength' | 'Cardio';
    category: string;
}

const NEW_EXERCISE_DB: Exercise[] = [
    // Chest
    { name: 'Barbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Dumbbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Incline Barbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Incline Dumbbell Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Decline Bench Press', type: 'Strength', category: 'Chest' },
    { name: 'Cable Chest Fly', type: 'Strength', category: 'Chest' },
    { name: 'Dumbbell Chest Fly', type: 'Strength', category: 'Chest' },
    { name: 'Machine Chest Fly', type: 'Strength', category: 'Chest' },
    { name: 'Push-Ups', type: 'Strength', category: 'Chest' },
    { name: 'Incline Push-Ups', type: 'Strength', category: 'Chest' },
    { name: 'Decline Push-Ups', type: 'Strength', category: 'Chest' },
    { name: 'Weighted Push-Ups', type: 'Strength', category: 'Chest' },
    { name: 'Chest Press Machine', type: 'Strength', category: 'Chest' },
    { name: 'Pec Deck', type: 'Strength', category: 'Chest' },

    // Back
    { name: 'Wide Grip Pull-Ups', type: 'Strength', category: 'Back' },
    { name: 'Close Grip Pull-Ups', type: 'Strength', category: 'Back' },
    { name: 'Neutral Grip Pull-Ups', type: 'Strength', category: 'Back' },
    { name: 'Lat Pulldown', type: 'Strength', category: 'Back' },
    { name: 'Bent Over Barbell Row', type: 'Strength', category: 'Back' },
    { name: 'Single-Arm Dumbbell Row', type: 'Strength', category: 'Back' },
    { name: 'Seated Cable Row', type: 'Strength', category: 'Back' },
    { name: 'T-Bar Row', type: 'Strength', category: 'Back' },
    { name: 'Standard Deadlifts', type: 'Strength', category: 'Back' },
    { name: 'Romanian Deadlifts', type: 'Strength', category: 'Back' },
    { name: 'Sumo Deadlifts', type: 'Strength', category: 'Back' },
    { name: 'Inverted Row', type: 'Strength', category: 'Back' },

    // Legs
    { name: 'Barbell Back Squat', type: 'Strength', category: 'Legs' },
    { name: 'Front Squat', type: 'Strength', category: 'Legs' },
    { name: 'Leg Press', type: 'Strength', category: 'Legs' },
    { name: 'Walking Lunges', type: 'Strength', category: 'Legs' },
    { name: 'Static Lunges', type: 'Strength', category: 'Legs' },
    { name: 'Dumbbell Lunges', type: 'Strength', category: 'Legs' },
    { name: 'Step-Ups', type: 'Strength', category: 'Legs' },
    { name: 'Leg Extension Machine', type: 'Strength', category: 'Legs' },
    { name: 'Seated Leg Curl Machine', type: 'Strength', category: 'Legs' },
    { name: 'Lying Leg Curl Machine', type: 'Strength', category: 'Legs' },
    { name: 'Glute Kickbacks', type: 'Strength', category: 'Legs' },
    { name: 'Hip Thrusts', type: 'Strength', category: 'Legs' },
    
    // Shoulders
    { name: 'Overhead Press (Barbell)', type: 'Strength', category: 'Shoulders' },
    { name: 'Overhead Press (Dumbbell)', type: 'Strength', category: 'Shoulders' },
    { name: 'Arnold Press', type: 'Strength', category: 'Shoulders' },
    { name: 'Lateral Raises', type: 'Strength', category: 'Shoulders' },
    { name: 'Front Raises', type: 'Strength', category: 'Shoulders' },
    { name: 'Rear Delt Fly (Dumbbell)', type: 'Strength', category: 'Shoulders' },
    { name: 'Reverse Pec Deck', type: 'Strength', category: 'Shoulders' },
    { name: 'Upright Row', type: 'Strength', category: 'Shoulders' },
    { name: 'Shrugs (Barbell)', type: 'Strength', category: 'Shoulders' },
    { name: 'Shrugs (Dumbbell)', type: 'Strength', category: 'Shoulders' },

    // Arms
    { name: 'Barbell Curl', type: 'Strength', category: 'Arms' },
    { name: 'Dumbbell Curl', type: 'Strength', category: 'Arms' },
    { name: 'Preacher Curl', type: 'Strength', category: 'Arms' },
    { name: 'Concentration Curl', type: 'Strength', category: 'Arms' },
    { name: 'Hammer Curl', type: 'Strength', category: 'Arms' },
    { name: 'Cable Curl', type: 'Strength', category: 'Arms' },
    { name: 'Tricep Dips', type: 'Strength', category: 'Arms' },
    { name: 'Tricep Pushdown (Cable)', type: 'Strength', category: 'Arms' },
    { name: 'Overhead Tricep Extension', type: 'Strength', category: 'Arms' },
    { name: 'Skull Crushers', type: 'Strength', category: 'Arms' },
    { name: 'Close-Grip Bench Press', type: 'Strength', category: 'Arms' },

    // Core
    { name: 'Crunches', type: 'Strength', category: 'Core' },
    { name: 'Sit-Ups', type: 'Strength', category: 'Core' },
    { name: 'Plank', type: 'Strength', category: 'Core' },
    { name: 'Side Plank', type: 'Strength', category: 'Core' },
    { name: 'Weighted Plank', type: 'Strength', category: 'Core' },
    { name: 'Hanging Leg Raises', type: 'Strength', category: 'Core' },
    { name: 'Lying Leg Raises', type: 'Strength', category: 'Core' },
    { name: 'Russian Twists', type: 'Strength', category: 'Core' },
    { name: 'Cable Woodchoppers', type: 'Strength', 'category': 'Core'},
    { name: 'Ab Rollouts', type: 'Strength', category: 'Core' },
    { name: 'Mountain Climbers', type: 'Strength', category: 'Core' },
    { name: 'Toe Touches', type: 'Strength', category: 'Core' },
    { name: 'Bicycle Crunches', type: 'Strength', category: 'Core' },

    // Full-Body & Functional
    { name: 'Burpees', type: 'Strength', category: 'Full-Body' },
    { name: 'Kettlebell Swings', type: 'Strength', category: 'Full-Body' },
    { name: 'Clean and Press', type: 'Strength', category: 'Full-Body' },
    { name: 'Snatch', type: 'Strength', category: 'Full-Body' },
    { name: 'Medicine Ball Slams', type: 'Strength', category: 'Full-Body' },
    { name: 'Battle Ropes', type: 'Strength', category: 'Full-Body' },
    { name: 'Farmer’s Carry', type: 'Strength', category: 'Full-Body' },
    { name: 'Sled Push / Pull', type: 'Strength', category: 'Full-Body' },
    
    // Cardio
    { name: 'Treadmill', type: 'Cardio', category: 'Cardio' },
    { name: 'Elliptical Trainer', type: 'Cardio', category: 'Cardio' },
    { name: 'Stationary Bike', type: 'Cardio', category: 'Cardio' },
    { name: 'Rowing Machine', type: 'Cardio', category: 'Cardio' },
    { name: 'Stair Climber', type: 'Cardio', category: 'Cardio' },
    { name: 'Air Bike', type: 'Cardio', category: 'Cardio' },
    { name: 'Running', type: 'Cardio', category: 'Cardio' },
    { name: 'Swimming', type: 'Cardio', category: 'Cardio' },
];


const App = () => {
    // === STATE MANAGEMENT ===
    const [workouts, setWorkouts] = useState<Workout[]>(() => {
        try {
            const saved = localStorage.getItem('workouts');
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });
    
    const [exerciseLibrary, setExerciseLibrary] = useState<Exercise[]>(() => {
        try {
            const saved = localStorage.getItem('exerciseLibrary');
            // Merge initial DB with saved and remove duplicates
            const savedLibrary: Exercise[] = saved ? JSON.parse(saved) : [];
            const combined: Exercise[] = [...NEW_EXERCISE_DB, ...savedLibrary];
            const unique = combined.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i);
            return unique;
        } catch (e) { return NEW_EXERCISE_DB; }
    });
    
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [activeTab, setActiveTab] = useState('summary');
    const [view, setView] = useState<{ name: 'main' | 'detail', data: any }>({ name: 'main', data: null });
    const [exerciseToLog, setExerciseToLog] = useState<Exercise | null>(null);

    // === DATA PERSISTENCE ===
    useEffect(() => {
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }, [workouts]);
    
    useEffect(() => {
        localStorage.setItem('exerciseLibrary', JSON.stringify(exerciseLibrary));
    }, [exerciseLibrary]);

    // === DERIVED STATE & MEMOS ===
    const historicalWorkouts = useMemo(() => {
        const history = workouts.reduce((acc: Record<string, Workout[]>, workout) => {
            const date = new Date(workout.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            if (!acc[date]) acc[date] = [];
            acc[date].push(workout);
            return acc;
        }, {});
        return Object.entries(history).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
    }, [workouts]);

    // === HANDLERS ===
    const addWorkout = (workout: Omit<Workout, 'id' | 'timestamp' | 'calories'>) => {
        const newWorkout = {
            id: Date.now(),
            timestamp: new Date(`${workout.date}T${new Date().toTimeString().split(' ')[0]}`).toISOString(),
            ...workout,
            calories: calculateCalories(workout),
        };
        setWorkouts(prev => [...prev, newWorkout]);
    };
    
    const calculateCalories = ({ type, duration, sets }: { type: string, duration?: number, sets?: Partial<SetData>[] }) => {
        if (type === 'Cardio') return Math.round((duration || 0) * 8.5);
        if (!sets) return 0;
        const totalVolume = sets.reduce((acc, set) => acc + ( (set.weight || 0) * (set.reps || 0) ), 0);
        return Math.round(totalVolume * 0.15);
    };

    const handleSelectExerciseHistory = (exerciseName: string) => setView({ name: 'detail', data: exerciseName });
    const handleBackToMain = () => setView({ name: 'main', data: null });
    
    const handleAddExerciseFromLibrary = (exercise: Exercise) => {
        setExerciseToLog(exercise);
        setActiveTab('summary');
    };
    
    const handleAddCustomExercise = (newExercise: Exercise) => {
        if (!exerciseLibrary.some(ex => ex.name.toLowerCase() === newExercise.name.toLowerCase())) {
            setExerciseLibrary(prev => [...prev, newExercise]);
        }
    };

    // === RENDER ===
    if (view.name === 'detail') {
        return <ExerciseDetailView exerciseName={view.data} workouts={workouts} onBack={handleBackToMain} />;
    }

    return (
        <div style={styles.container}>
            <Header />
            <main style={styles.main}>
                {activeTab === 'summary' && (
                    <>
                        <WorkoutForm 
                            onAddWorkout={addWorkout}
                            exerciseLibrary={exerciseLibrary}
                            exerciseToLog={exerciseToLog}
                            clearExerciseToLog={() => setExerciseToLog(null)}
                            currentDate={currentDate}
                            onDateChange={setCurrentDate}
                        />
                        <TodaysWorkout workouts={workouts} date={currentDate} />
                        <WorkoutHistory historicalWorkouts={historicalWorkouts} onSelectExercise={handleSelectExerciseHistory} />
                    </>
                )}
                {activeTab === 'library' && 
                    <ExerciseLibrary 
                        exerciseLibrary={exerciseLibrary} 
                        onAddFromLibrary={handleAddExerciseFromLibrary}
                        onAddCustom={handleAddCustomExercise}
                    />
                }
            </main>
            <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

// === COMPONENTS ===

const Header = () => (
    <header style={styles.header}>
        <div style={styles.headerTop}>
            <span>{new Date().toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'})}</span>
            <span style={styles.headerIcons}>&#x1f4f6; &#x1f4f WiFi &#x1f50b;</span>
        </div>
        <div style={styles.summaryHeader}>
            <span style={styles.summaryTitle}>Gymbrootan</span>
            <span style={styles.profilePic}></span>
        </div>
    </header>
);

const TodaysWorkout = ({ workouts, date }: { workouts: Workout[], date: string }) => {
    const todaysWorkouts = workouts.filter(w => w.date === date);

    const totalVolume = useMemo(() => {
        return todaysWorkouts.reduce((total, workout) => {
            if(workout.type !== 'Strength' || !workout.sets) return total;
            const workoutVolume = workout.sets.reduce((workoutAcc, set) => workoutAcc + ((set.weight || 0) * (set.reps || 0)), 0);
            return total + workoutVolume;
        }, 0);
    }, [todaysWorkouts]);

    return (
        <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>Today's Workout ({new Date(date + 'T00:00:00').toLocaleDateString('en-US', {month: 'short', day: 'numeric'})})</h2>
            {todaysWorkouts.length > 0 ? (
                <>
                {totalVolume > 0 && <p style={styles.totalVolume}>Total Volume: <strong>{totalVolume.toLocaleString()} kg</strong></p>}
                <ul style={styles.historyList}>
                    {todaysWorkouts.map(w => (
                        <li key={w.id} style={{...styles.historyItem, cursor: 'default'}}>
                             <div style={styles.workoutDetails}>
                                <strong>{w.name}</strong>
                                {w.type === 'Strength' && w.sets ? (
                                    <span>{w.sets.length} sets, {w.sets.reduce((acc, s) => acc + (s.reps || 0), 0)} reps</span>
                                ) : (
                                    <span>{w.duration} min</span>
                                )}
                            </div>
                            <div style={styles.workoutCalories}>
                                {w.calories} Cal
                            </div>
                        </li>
                    ))}
                </ul>
                </>
            ) : (
                <p style={styles.noHistory}>No workouts logged for this day.</p>
            )}
        </div>
    );
}

const WorkoutForm = ({ onAddWorkout, exerciseLibrary, exerciseToLog, clearExerciseToLog, currentDate, onDateChange }: { onAddWorkout: (workout: any) => void, exerciseLibrary: Exercise[], exerciseToLog: Exercise | null, clearExerciseToLog: () => void, currentDate: string, onDateChange: (date: string) => void }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Strength');
    const [duration, setDuration] = useState('');
    const [sets, setSets] = useState<{weight: string|number, reps: string|number}[]>([{ weight: '', reps: '' }]);
    const [suggestions, setSuggestions] = useState<Exercise[]>([]);

    useEffect(() => {
        if(exerciseToLog){
            setName(exerciseToLog.name);
            setType(exerciseToLog.type);
            clearExerciseToLog();
        }
    }, [exerciseToLog, clearExerciseToLog]);
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.length > 1) {
            const filtered = exerciseLibrary.filter(ex => ex.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };
    
    useEffect(() => {
        const selected = exerciseLibrary.find(ex => ex.name === name);
        if(selected) setType(selected.type);
    }, [name, exerciseLibrary]);

    const handleSuggestionClick = (suggestion: Exercise) => {
        setName(suggestion.name);
        setType(suggestion.type);
        setSuggestions([]);
    };
    
    const handleSetChange = (index: number, field: 'weight' | 'reps', value: string) => {
        const newSets = [...sets];
        newSets[index][field] = Number(value);
        setSets(newSets);
    };
    
    const addSet = () => setSets([...sets, { weight: '', reps: '' }]);
    const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const workoutData = type === 'Strength'
            ? { name, type, date: currentDate, sets }
            : { name, type, date: currentDate, duration: Number(duration) };

        onAddWorkout(workoutData);
        setName(''); setType('Strength'); setDuration(''); setSets([{ weight: '', reps: '' }]);
    };

    return (
        <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>Log Workout</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                 <input type="date" value={currentDate} onChange={e => onDateChange(e.target.value)} style={styles.input} required />
                 <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Exercise Name" value={name} onChange={handleNameChange} style={styles.input} required />
                    {suggestions.length > 0 && (
                        <ul style={styles.suggestionsList}>
                            {suggestions.map(s => (
                                <li key={s.name} onClick={() => handleSuggestionClick(s)} style={styles.suggestionItem}>
                                    {s.name} <span style={styles.suggestionCategory}>({s.category})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {type === 'Strength' ? (
                    <div style={styles.setsContainer}>
                        <div style={styles.setRowHeader}>
                            <span>Set</span>
                            <span>Weight (kg)</span>
                            <span>Reps</span>
                            <span></span>
                        </div>
                        {sets.map((set, index) => (
                            <div key={index} style={styles.setRow}>
                                <span style={styles.setNumber}>{index + 1}</span>
                                <input type="number" placeholder="0" value={set.weight} onChange={e => handleSetChange(index, 'weight', e.target.value)} style={styles.setInput} />
                                <input type="number" placeholder="0" value={set.reps} onChange={e => handleSetChange(index, 'reps', e.target.value)} style={styles.setInput} />
                                <button type="button" onClick={() => removeSet(index)} style={styles.removeSetBtn}>&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={addSet} style={styles.addSetBtn}>+ Add Set</button>
                    </div>
                ) : (
                    <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} style={styles.input} required />
                )}
                <button type="submit" style={styles.button}>Add Workout</button>
            </form>
        </div>
    );
};


const WorkoutHistory = ({ historicalWorkouts, onSelectExercise }: { historicalWorkouts: [string, Workout[]][], onSelectExercise: (name: string) => void }) => (
    <div style={styles.historyCard}>
        <h2 style={styles.cardTitle}>Logbook</h2>
        {historicalWorkouts.length > 0 ? (
            historicalWorkouts.map(([date, workoutsOnDate]) => (
                <div key={date}>
                    <h3 style={styles.historyDate}>{date}</h3>
                    <ul style={styles.historyList}>
                        {workoutsOnDate.map(w => (
                            <li key={w.id} style={styles.historyItem} onClick={() => onSelectExercise(w.name)} role="button" tabIndex={0}>
                                <div style={styles.workoutDetails}>
                                    <strong>{w.name}</strong>
                                    {w.type === 'Strength' && w.sets ? (
                                        <span>{w.sets.length}x{w.sets.reduce((t,s) => t + (s.reps || 0), 0)} reps</span>
                                    ) : (
                                        <span>{w.duration} min</span>
                                    )}
                                </div>
                                <div style={styles.workoutCalories}>
                                    {w.calories} Cal
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        ) : (
            <p style={styles.noHistory}>Log your first workout to see history.</p>
        )}
    </div>
);

const AddCustomExerciseForm = ({ category, onAddCustom }: { category: string, onAddCustom: (ex: Exercise) => void }) => {
    const [name, setName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddCustom({ name: name.trim(), type: category === 'Cardio' ? 'Cardio' : 'Strength', category });
            setName('');
            setIsAdding(false);
        }
    };

    if (!isAdding) {
        return <button onClick={() => setIsAdding(true)} style={styles.addCustomBtn}>+ Add Custom Exercise</button>;
    }

    return (
        <form onSubmit={handleSubmit} style={styles.addCustomForm}>
            <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="New Exercise Name"
                style={{...styles.input, padding: '8px 10px'}}
                autoFocus
            />
            <button type="submit" style={{...styles.button, padding: '8px 10px', fontSize: '14px'}}>Save</button>
            <button type="button" onClick={() => setIsAdding(false)} style={{...styles.removeSetBtn, color: 'var(--text-secondary)'}}>Cancel</button>
        </form>
    );
};

const ExerciseLibrary = ({ exerciseLibrary, onAddFromLibrary, onAddCustom }: { exerciseLibrary: Exercise[], onAddFromLibrary: (ex: Exercise) => void, onAddCustom: (ex: Exercise) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const categories = useMemo(() => {
        const filtered = exerciseLibrary.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered.reduce((acc: Record<string, Exercise[]>, ex) => {
            const category = ex.category || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(ex);
            return acc;
        }, {});
    }, [searchTerm, exerciseLibrary]);
    
    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({...prev, [category]: !prev[category]}));
    };

    return (
        <div style={styles.libraryCard}>
            <h2 style={styles.cardTitle}>Exercise Library</h2>
            <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{...styles.input, marginBottom: '20px'}}
            />
            {Object.entries(categories).sort((a,b) => a[0].localeCompare(b[0])).map(([category, exercises]) => (
                <div key={category}>
                    <button onClick={() => toggleCategory(category)} style={styles.categoryHeader}>
                        <span>{category}</span>
                        <span>{openCategories[category] ? '−' : '+'}</span>
                    </button>
                    {openCategories[category] && (
                        <>
                            <ul style={styles.libraryList}>
                                {exercises.sort((a,b) => a.name.localeCompare(b.name)).map(ex => (
                                    <li key={ex.name} style={styles.libraryItem}>
                                        <div style={styles.libraryItemDetails}>
                                          <span style={styles.libraryItemName}>{ex.name}</span>
                                          <span style={styles.libraryItemType}>{ex.type}</span>
                                        </div>
                                        <button onClick={() => onAddFromLibrary(ex)} style={styles.libraryAddBtn}>+</button>
                                    </li>
                                ))}
                            </ul>
                           <AddCustomExerciseForm category={category} onAddCustom={onAddCustom} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

const ProgressGraph = ({ data, yAxisLabel, unit }: {data: {x: number, y: number}[], yAxisLabel: string, unit: string}) => {
    const [tooltip, setTooltip] = useState<{x: number, y: number, data: {x: number, y: number}} | null>(null);
    if (!Array.isArray(data) || data.length < 2) return <p style={styles.noHistory}>Not enough data to show progress.</p>;

    const width = 340;
    const height = 180;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };

    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = 0;
    const maxY = Math.max(...yValues);
    
    const getX = (x: number) => padding.left + ((x - minX) / (maxX - minX)) * (width - padding.left - padding.right);
    const getY = (y: number) => height - padding.bottom - ((y - minY) / (maxY - minY)) * (height - padding.top - padding.bottom);

    const getPathCoordinates = (d: {x: number, y: number}) => [getX(d.x), getY(d.y)];
    
    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getPathCoordinates(d).join(',')}`).join(' ');
    const areaPath = `${linePath} V ${height - padding.bottom} H ${padding.left} Z`;
    
    const yAxisTicks = useMemo(() => {
        if (maxY === 0) return [{ value: 0, y: getY(0) }];
        const ticks = [];
        for (let i = 0; i <= 4; i++) {
            const value = Math.round((maxY / 4) * i);
            ticks.push({ value, y: getY(value) });
        }
        return ticks;
    }, [maxY]);
    
    const handleMouseEnter = (d: {x: number, y: number}) => {
        const [x, y] = getPathCoordinates(d);
        setTooltip({
            x: x,
            y: y,
            data: d
        });
    };
    
    const handleMouseLeave = () => setTooltip(null);
    
    return (
        <div style={{ position: 'relative' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label={`Graph of ${yAxisLabel} over time.`}>
                <defs>
                    <linearGradient id="progressGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--ring-move)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--ring-move)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Y Axis Grid Lines & Labels */}
                {yAxisTicks.map(tick => (
                    <g key={tick.value}>
                        <line x1={padding.left} y1={tick.y} x2={width-padding.right} y2={tick.y} stroke="var(--border-color)" strokeWidth="0.5" />
                        <text x={padding.left - 8} y={tick.y + 4} textAnchor="end" fill="var(--text-secondary)" fontSize="10">{tick.value}</text>
                    </g>
                ))}

                {/* X Axis Labels */}
                 <text x={padding.left} y={height - 10} fill="var(--text-secondary)" fontSize="10">{new Date(minX).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>
                 <text x={width - padding.right} y={height - 10} textAnchor="end" fill="var(--text-secondary)" fontSize="10">{new Date(maxX).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>

                {/* Area Path */}
                <path d={areaPath} fill="url(#progressGradient)" />

                {/* Line Path */}
                <path d={linePath} fill="none" stroke="var(--ring-move)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Points & Hover targets */}
                {data.map((d, i) => (
                    <circle 
                        key={i} 
                        cx={getX(d.x)} 
                        cy={getY(d.y)} 
                        r="8" 
                        fill="transparent"
                        onMouseEnter={() => handleMouseEnter(d)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}

                 {/* Active Point Indicator */}
                 {tooltip && (
                    <circle cx={tooltip.x} cy={tooltip.y} r="4" fill="var(--ring-move)" stroke="var(--background)" strokeWidth="2" style={{pointerEvents: 'none'}}/>
                 )}
            </svg>
             {/* Tooltip */}
             {tooltip && (
                <div style={{...styles.graphTooltip, left: `${tooltip.x}px`, top: `${tooltip.y}px`}}>
                    <div style={styles.graphTooltipContent}>
                        <strong>{tooltip.data.y} {unit}</strong>
                        <span>{new Date(tooltip.data.x).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                    </div>
                </div>
            )}
        </div>
    );
};


const ExerciseDetailView = ({ exerciseName, workouts, onBack }: { exerciseName: string, workouts: Workout[], onBack: () => void }) => {
    const history = useMemo(() => {
        return workouts
            .filter(w => w.name === exerciseName)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }, [workouts, exerciseName]);
    
    const exerciseType = history.length > 0 ? history[0].type : 'Strength';
    
    const graphData = useMemo(() => {
        if (exerciseType === 'Strength') {
            interface DailyMaxEntry {
                y: number;
                timestamp: number;
            }
            const dailyMax = history.reduce((acc: Record<string, DailyMaxEntry>, workout) => {
                const date = new Date(workout.timestamp).toISOString().split('T')[0];
                const maxWeightInWorkout = workout.sets ? Math.max(0, ...workout.sets.map(set => set.weight || 0)) : 0;
                
                if (!acc[date] || maxWeightInWorkout > acc[date].y) {
                    acc[date] = {y: maxWeightInWorkout, timestamp: new Date(workout.timestamp).getTime()};
                }
                return acc;
            }, {});

            return Object.values(dailyMax)
                .map(entry => ({ x: entry.timestamp, y: entry.y }))
                .sort((a,b) => a.x - b.x);
        }
        return history.map(w => ({ x: new Date(w.timestamp).getTime(), y: w.duration || 0 }));
    }, [history, exerciseType]);

    return (
        <div style={styles.detailContainer}>
            <header style={styles.detailHeader}>
                <button onClick={onBack} style={styles.backButton}>&lt; Summary</button>
            </header>
            <main style={{...styles.main, paddingTop: '16px'}}>
                <div style={styles.formCard}>
                    <h2 style={styles.cardTitle}>{exerciseName}</h2>
                    <h3 style={styles.detailSubtitle}>Progress</h3>
                    <ProgressGraph 
                        data={graphData} 
                        yAxisLabel={exerciseType === 'Strength' ? 'Max Weight' : 'Duration'}
                        unit={exerciseType === 'Strength' ? 'kg' : 'min'}
                    />
                    
                    <h3 style={{...styles.detailSubtitle, marginTop: '24px'}}>Logbook</h3>
                     <ul style={styles.historyList}>
                        {history.slice().reverse().map(w => (
                            <li key={w.id} style={{...styles.historyItem, cursor: 'default'}}>
                                <div style={styles.workoutDetails}>
                                    <strong>{new Date(w.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                                    {w.type === 'Strength' && w.sets ? (
                                        <span>{w.sets.map(s => `${s.weight || 0}kg x ${s.reps || 0}`).join(', ')}</span>
                                    ) : (
                                        <span>{w.duration} min</span>
                                    )}
                                </div>
                                <div style={styles.workoutCalories}>
                                    {w.calories} Cal
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

const Footer = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
    <footer style={styles.footer}>
        <div style={activeTab === 'summary' ? {...styles.footerItem, ...styles.footerItemActive} : styles.footerItem} onClick={() => setActiveTab('summary')}>
            <svg style={styles.footerIcon} viewBox="0 0 24 24"><path fill="currentColor" d="M12,1L2,12h3v8h14v-8h3M12,5.7l6,5.3v6H6v-6Z" /></svg>
            <span>Summary</span>
        </div>
        <div style={activeTab === 'library' ? {...styles.footerItem, ...styles.footerItemActive} : styles.footerItem} onClick={() => setActiveTab('library')}>
             <svg style={styles.footerIcon} viewBox="0 0 24 24"><path fill="currentColor" d="M18,2H6C4.9,2,4,2.9,4,4V20C4,21.1,4.9,22,6,22H18C19.1,22,20,21.1,20,20V4C20,2.9,19.1,2,18,2M6,4H11V12L8.5,10.5L6,12V4M18,20H6V14L8.5,12.5L11,14V4H18V20Z" /></svg>
            <span>Library</span>
        </div>
    </footer>
);


// === STYLES ===

const styles: Record<string, React.CSSProperties> = {
    container: { maxWidth: '450px', margin: '0 auto', backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    main: { flex: 1, padding: '0 16px 80px 16px' },
    header: { padding: '8px 16px 16px 16px' },
    headerTop: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' },
    headerIcons: { display: 'flex', gap: '8px', alignItems: 'center' },
    summaryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' },
    summaryTitle: { fontSize: '34px', fontWeight: '800' },
    profilePic: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--button-bg)', backgroundImage: 'url(https://i.pravatar.cc/80)', backgroundSize: 'cover' },
    formCard: { backgroundColor: 'var(--surface)', borderRadius: '12px', padding: '16px', marginBottom: '20px' },
    cardTitle: { margin: '0 0 16px 0', fontSize: '20px', fontWeight: '700' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    input: { backgroundColor: 'var(--button-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', color: 'var(--text-primary)', fontSize: '16px', width: '100%', boxSizing: 'border-box' },
    button: { backgroundColor: 'var(--ring-move)', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
    historyCard: { backgroundColor: 'var(--surface)', borderRadius: '12px', padding: '16px', marginBottom: '20px' },
    historyDate: { fontSize: '14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' },
    historyList: { listStyle: 'none', padding: 0, margin: 0 },
    historyItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' },
    workoutDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
    workoutCalories: { color: 'var(--ring-move)', fontWeight: '600', alignSelf: 'center' },
    noHistory: { color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' },
    footer: { position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '450px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(28, 28, 30, 0.85)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-color)', padding: '8px 0 24px 0' },
    footerItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '10px', cursor: 'pointer' },
    footerItemActive: { color: 'var(--ring-move)' },
    footerIcon: { width: '28px', height: '28px' },
    suggestionsList: { position: 'absolute', width: '100%', backgroundColor: '#2c2c2e', border: '1px solid var(--border-color)', borderRadius: '8px', listStyle: 'none', padding: '0', margin: '4px 0 0 0', zIndex: 10, maxHeight: '200px', overflowY: 'auto' },
    suggestionItem: { padding: '12px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' },
    suggestionCategory: { fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' },
    libraryCard: { backgroundColor: 'var(--surface)', borderRadius: '12px', padding: '16px', marginBottom: '80px' },
    categoryHeader: { background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '18px', fontWeight: '600', padding: '16px 0', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    libraryList: { listStyle: 'none', padding: 0, margin: 0 },
    libraryItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-color)' },
    libraryItemDetails: { display: 'flex', flexDirection: 'column', gap: '4px'},
    libraryItemName: { fontWeight: '500' },
    libraryItemType: { fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: 'var(--button-bg)', padding: '2px 6px', borderRadius: '4px', alignSelf: 'flex-start' },
    libraryAddBtn: { background: 'var(--button-bg)', border: '1px solid var(--border-color)', color: 'var(--ring-move)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '4px' },
    detailContainer: { maxWidth: '450px', margin: '0 auto', backgroundColor: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    detailHeader: { padding: '16px', borderBottom: '1px solid var(--border-color)' },
    backButton: { background: 'none', border: 'none', color: 'var(--ring-move)', fontSize: '16px', cursor: 'pointer', fontWeight: '600' },
    detailSubtitle: { fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '16px', marginBottom: '12px' },
    setsContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
    setRow: { display: 'grid', gridTemplateColumns: '30px 1fr 1fr 40px', gap: '10px', alignItems: 'center' },
    setRowHeader: { display: 'grid', gridTemplateColumns: '30px 1fr 1fr 40px', gap: '10px', color: 'var(--text-secondary)', fontSize: '12px', padding: '0 4px' },
    setNumber: { color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'center' },
    setInput: { backgroundColor: 'var(--button-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', color: 'var(--text-primary)', fontSize: '16px', textAlign: 'center', width: '100%', boxSizing: 'border-box' },
    removeSetBtn: { background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '24px', cursor: 'pointer', textAlign: 'center' },
    addSetBtn: { background: 'var(--button-bg)', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
    totalVolume: { color: 'var(--text-secondary)', fontSize: '14px', margin: '-8px 0 16px 0' },
    addCustomBtn: { background: 'none', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer', marginTop: '12px' },
    addCustomForm: { display: 'flex', gap: '10px', alignItems: 'center', marginTop: '12px', paddingLeft: '10px' },
    graphTooltip: { position: 'absolute', transform: 'translate(-50%, -125%)', pointerEvents: 'none', zIndex: 10 },
    graphTooltipContent: { 
        backgroundColor: 'var(--button-bg)', 
        color: 'var(--text-primary)', 
        padding: '6px 10px', 
        borderRadius: '6px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px',
        gap: '2px',
        border: '1px solid var(--border-color)'
    },
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
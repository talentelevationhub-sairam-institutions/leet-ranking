/**
 * Enhanced Local Analysis Engine for LeetCode performance
 * Generates a highly personalized markdown report based on user statistics.
 */

export const generateLocalAnalysis = (data, name = "Learner") => {
    const { 
        totalSolved = 0, 
        easySolved = 0, 
        mediumSolved = 0, 
        hardSolved = 0, 
        ranking, 
        contributionPoint = 0,
        submissionCalendar = {} 
    } = data;

    // Calculate distributions
    const total = totalSolved || 1;
    const easyPct = ((easySolved / total) * 100).toFixed(1);
    const mediumPct = ((mediumSolved / total) * 100).toFixed(1);
    const hardPct = ((hardSolved / total) * 100).toFixed(1);

    // Consistency check
    const today = Math.floor(Date.now() / 1000);
    const recentActivityCount = Object.keys(submissionCalendar).filter(ts => {
        const timestamp = parseInt(ts);
        return (today - timestamp) < (30 * 24 * 60 * 60); // Last 30 days
    }).length;

    let consistencyScore = "Minimal";
    let consistencyDetails = "Action required: You haven't had many submissions recently. Aim for a 3-day coding streak to regain momentum.";
    
    if (recentActivityCount > 25) {
        consistencyScore = "Godlike 🔥";
        consistencyDetails = "Incredible! You are among the top consistent coders. Keep this momentum for the next 4 weeks to see a massive ranking jump.";
    } else if (recentActivityCount > 15) {
        consistencyScore = "Consistent 🚀";
        consistencyDetails = "Great job! You are coding regularly. This is the fastest way to build pattern recognition.";
    } else if (recentActivityCount > 5) {
        consistencyScore = "Improving 📈";
        consistencyDetails = "You're picking up the pace. Try to solve at least one problem every day to solidify your habits.";
    }

    // Tier Classification
    let tier = "";
    let tierAdvice = "";
    let nextMilestone = "";

    if (totalSolved < 50) {
        tier = "Novice (Foundation Builder)";
        tierAdvice = "At this stage, your priority is to master **Basic Data Structures** (Arrays, Strings, Linked Lists). Don't worry about speed; focus on understanding how to translate logic into code.";
        nextMilestone = "50 Solved Problems";
    } else if (totalSolved < 200) {
        tier = "Apprentice (Pattern Seeker)";
        tierAdvice = "You've moved past the basics. Now, focus on **Algorithmic Patterns** like Sliding Window, Two Pointers, and Recursion. Start shifting your focus towards Medium problems (aim for 40% of your total).";
        nextMilestone = "200 Solved Problems";
    } else if (totalSolved < 500) {
        tier = "Specialist (Problem Solver)";
        tierAdvice = "You are becoming a proficient coder! Focus on **Advanced Topics** like Dynamic Programming, Graphs (BFS/DFS), and Trees. You should be comfortable solving most Medium problems within 30-40 minutes.";
        nextMilestone = "500 Solved Problems";
    } else {
        tier = "Master (Competitive Edge)";
        tierAdvice = "Excellent work! To reach the next level, focus on **Hard Problems** and optimization. Participate in Weekly Contests and aim to solve 3+ problems consistently. Study Segment Trees, Union Find, and complex DP.";
        nextMilestone = "Top 50k Global Ranking";
    }

    // Identify Strengths
    let strength = "";
    if (easySolved > mediumSolved && easySolved > hardSolved) {
        strength = "Fundamental Syntax & Logic (Easy problems mastery)";
    } else if (mediumSolved > easySolved) {
        strength = "Algorithmic thinking (Strong Medium problem count)";
    } else {
        strength = "Advanced problem handling (Significant Hard problem count)";
    }

    // Identify specific Weakness/Action
    let primaryFocus = "";
    if (mediumPct < 30) {
        primaryFocus = "Your **Medium problem ratio** is low (${mediumPct}%). Mediums are the backbone of technical interviews. Solve at least 3 Mediums for every 1 Easy you do.";
    } else if (hardPct < 5) {
        primaryFocus = "It's time to face the **Hard problems**. Even if you spend 2 hours on one, the mental growth is worth it. Target Graph or DP 'Hard' tags.";
    } else {
        primaryFocus = "Focus on **Contest Performance**. Try to solve problems under 20 minutes without looking at hints.";
    }

    const markdown = `
# LeetCode Analysis: ${name}

Hello **${name.split(' ')[0]}**! I have completed a deep-dive analysis of your LeetCode journey. You are currently in the **${tier}** category.

---

## 📊 Detailed Performance Snapshot
- **Core Status:** Solved **${totalSolved}** problems total.
- **Difficulty Split:** ${easySolved} Easy | ${mediumSolved} Medium | ${hardSolved} Hard.
- **Global Standing:** Currently ranked **#${ranking?.toLocaleString() || 'N/A'}** worldwide.
- **Consistency Score:** ${consistencyScore}
- **Primary Strength:** ${strength}

> [!NOTE]
> **Current Milestone:** ${nextMilestone}

---

## 🎯 Personalized Roadmap for ${name.split(' ')[0]}

### 1. The Skill Gap Analysis
${tierAdvice}

### 2. Strategic Focus Area
${primaryFocus}

### 3. Consistency Feedback
${consistencyDetails}

---

## 🛠️ Action Plan (Next 30 Days)
1. **Target Ratio:** Aim to reach **${Math.min(parseInt(mediumPct) + 10, 50)}%** Medium problems in your total count.
2. **Topic Recommendation:** Based on your tier, you should marathon the **"Top Interview Questions"** list on LeetCode.
3. **Mock Contests:** Set a timer for 90 minutes and try to solve 1 Medium and 1 Hard problem from your weak areas.

---

## 💡 Expert Tip for ${name.split(' ')[0]}
> [!TIP]
> **The 45-Minute Rule:** If you are stuck on a Medium problem for more than 45 minutes without a plan, read the approach but **NOT** the code. Try to implement it yourself after reading the strategy.

Keep pushing, ${name.split(' ')[0]}! You've already solved **${totalSolved}** problems, which puts you ahead of 90% of casual learners. The road to Mastery is through consistency.
`;

    return markdown;
};

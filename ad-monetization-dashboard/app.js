// ===== Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('pageTitle');

    const sectionTitles = {
        'dashboard': 'Dashboard',
        'creative-audit': 'Creative Diversity Audit',
        'structure-builder': 'Campaign Structure Builder',
        'creative-generator': 'Creative Concept Generator',
        'scaling-calc': 'Budget Scaling Calculator',
        'checklist': 'Andromeda 2.0 Readiness',
        'knowledge': 'Knowledge Base'
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.dataset.section;

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');

            pageTitle.textContent = sectionTitles[targetSection] || 'Dashboard';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ===== Creative Audit Scoring =====
    const auditChecks = document.querySelectorAll('.audit-check');
    const maxScores = { format: 25, angle: 40, hook: 25, setup: 45 };

    function updateAuditScore() {
        const scores = { format: 0, angle: 0, hook: 0, setup: 0 };

        auditChecks.forEach(check => {
            if (check.checked) {
                scores[check.dataset.category] += parseInt(check.value);
            }
        });

        const total = scores.format + scores.angle + scores.hook + scores.setup;
        const maxTotal = 135;
        const percentage = Math.round((total / maxTotal) * 100);

        document.querySelector('.score-number').textContent = percentage;
        document.getElementById('auditScore').style.background =
            `conic-gradient(${getScoreColor(percentage)} ${percentage * 3.6}deg, var(--bg-primary) 0deg)`;

        // Update breakdowns
        updateBreakdown('format', scores.format, maxScores.format);
        updateBreakdown('angle', scores.angle, maxScores.angle);
        updateBreakdown('hook', scores.hook, maxScores.hook);
        updateBreakdown('setup', scores.setup, maxScores.setup);

        // Update verdict
        const verdict = document.getElementById('scoreVerdict');
        if (percentage >= 80) {
            verdict.innerHTML = '🟢 <strong>Excellent!</strong> Your creative strategy is well-aligned with Andromeda 2.0. Focus on maintaining creative freshness and scaling.';
            verdict.style.borderLeft = '3px solid var(--accent-green)';
        } else if (percentage >= 50) {
            verdict.innerHTML = '🟡 <strong>Getting there!</strong> You have a good foundation but need more creative diversity. Focus on adding distinct formats and messaging angles.';
            verdict.style.borderLeft = '3px solid var(--accent-orange)';
        } else if (percentage > 0) {
            verdict.innerHTML = '🔴 <strong>Needs work!</strong> Your strategy is still built for the old system. Prioritize: simplify structure, broaden targeting, and build genuinely diverse creative concepts.';
            verdict.style.borderLeft = '3px solid var(--accent-red)';
        } else {
            verdict.innerHTML = 'Check the boxes above to see your Andromeda 2.0 readiness score.';
            verdict.style.borderLeft = 'none';
        }
    }

    function updateBreakdown(category, score, max) {
        const progress = document.getElementById(`${category}Progress`);
        const scoreEl = document.getElementById(`${category}Score`);
        const pct = (score / max) * 100;
        progress.style.width = `${pct}%`;
        progress.style.background = pct >= 60 ? 'var(--gradient-3)' : pct >= 30 ? 'var(--gradient-1)' : 'var(--gradient-2)';
        scoreEl.textContent = `${score}/${max}`;
    }

    function getScoreColor(pct) {
        if (pct >= 80) return 'var(--accent-green)';
        if (pct >= 50) return 'var(--accent-orange)';
        return 'var(--accent-red)';
    }

    auditChecks.forEach(check => check.addEventListener('change', updateAuditScore));

    // ===== Structure Builder =====
    document.getElementById('buildStructure').addEventListener('click', () => {
        const budget = parseFloat(document.getElementById('monthlyBudget').value) || 5000;
        const type = document.getElementById('businessType').value;
        const products = parseInt(document.getElementById('numProducts').value) || 3;

        const dailyBudget = (budget / 30).toFixed(0);
        const output = document.getElementById('structureOutput');
        const visual = document.getElementById('structureVisual');
        const tips = document.getElementById('structureTips');

        const structures = {
            ecommerce: generateEcomStructure(dailyBudget, products),
            saas: generateSaasStructure(dailyBudget, products),
            local: generateLocalStructure(dailyBudget, products),
            agency: generateAgencyStructure(dailyBudget, products),
            info: generateInfoStructure(dailyBudget, products)
        };

        const result = structures[type];
        visual.innerHTML = result.html;
        tips.innerHTML = result.tips;
        output.style.display = 'block';
        output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function generateEcomStructure(daily, products) {
        const prospectBudget = Math.round(daily * 0.7);
        const asPlusBudget = Math.round(daily * 0.3);
        return {
            html: `
                <div class="structure-campaign">
                    <h4>📦 Campaign 1: CBO — Prospecting (Budget: $${prospectBudget}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — All Products</h5>
                            <ul>
                                <li>Targeting: Broad (no interests)</li>
                                <li>Optimization: Purchase</li>
                                <li>5-8 diverse creatives</li>
                                <li>Mix of formats & angles</li>
                            </ul>
                        </div>
                        ${products > 3 ? `
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Hero Product</h5>
                            <ul>
                                <li>Targeting: Broad (no interests)</li>
                                <li>Best-seller focused</li>
                                <li>5-8 diverse creatives</li>
                                <li>Different hooks per creative</li>
                            </ul>
                        </div>` : ''}
                    </div>
                </div>
                <div class="structure-campaign">
                    <h4>🚀 Campaign 2: Advantage+ Shopping ($${asPlusBudget}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Auto-Managed by Meta AI</h5>
                            <ul>
                                <li>Feed your best creatives</li>
                                <li>Let AI handle targeting</li>
                                <li>10+ diverse creatives recommended</li>
                                <li>Refresh creatives bi-weekly</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            tips: generateTips(daily, 'ecommerce')
        };
    }

    function generateSaasStructure(daily, products) {
        return {
            html: `
                <div class="structure-campaign">
                    <h4>💻 Campaign 1: CBO — Lead Generation (Budget: $${daily}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Free Trial/Demo</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Optimization: Lead or Sign Up</li>
                                <li>5-8 diverse creatives</li>
                                <li>Problem→Solution angles</li>
                            </ul>
                        </div>
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Social Proof</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Testimonial & case study focused</li>
                                <li>5-8 diverse creatives</li>
                                <li>ROI / data-driven hooks</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            tips: generateTips(daily, 'saas')
        };
    }

    function generateLocalStructure(daily, products) {
        return {
            html: `
                <div class="structure-campaign">
                    <h4>📍 Campaign 1: CBO — Local Awareness (Budget: $${daily}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Ad Set: Geo-Targeted Broad</h5>
                            <ul>
                                <li>Targeting: Broad + location radius</li>
                                <li>Optimization: Store visits / Leads</li>
                                <li>5-8 diverse creatives</li>
                                <li>Local community angles</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            tips: generateTips(daily, 'local')
        };
    }

    function generateAgencyStructure(daily, products) {
        return {
            html: `
                <div class="structure-campaign">
                    <h4>🏢 Campaign 1: CBO — Client Acquisition (Budget: $${daily}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Authority Building</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Optimization: Lead generation</li>
                                <li>Case study & result creatives</li>
                                <li>5-8 diverse concepts</li>
                            </ul>
                        </div>
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Value-First</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Educational content angles</li>
                                <li>Free resource / audit offers</li>
                                <li>5-8 diverse concepts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            tips: generateTips(daily, 'agency')
        };
    }

    function generateInfoStructure(daily, products) {
        return {
            html: `
                <div class="structure-campaign">
                    <h4>📚 Campaign 1: CBO — Course/Product Sales (Budget: $${daily}/day)</h4>
                    <div class="structure-adsets">
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Transformation</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Optimization: Purchase</li>
                                <li>Before/after stories</li>
                                <li>5-8 diverse creatives</li>
                            </ul>
                        </div>
                        <div class="structure-adset">
                            <h5>Ad Set: Broad — Proof & Results</h5>
                            <ul>
                                <li>Targeting: Broad</li>
                                <li>Student testimonials</li>
                                <li>Data & outcome hooks</li>
                                <li>5-8 diverse creatives</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            tips: generateTips(daily, 'info')
        };
    }

    function generateTips(daily, type) {
        const commonTips = [
            { title: '🎯 Broad is Best', text: 'Let Andromeda\'s AI find your customers. Remove interest stacking and lookalike restrictions.' },
            { title: '🔄 Creative Refresh', text: 'Refresh creatives every 2 weeks. Creative fatigue accelerates under Andromeda\'s automated retrieval.' },
            { title: '📊 Signal Quality', text: 'Ensure your Pixel + CAPI are sending clean data. Andromeda needs accurate conversion signals to learn.' },
        ];

        const typeTips = {
            ecommerce: { title: '🛒 E-com Tip', text: 'Use Advantage+ Shopping as your testing ground. Feed it 10+ genuinely distinct creatives for maximum AI learning.' },
            saas: { title: '💡 SaaS Tip', text: 'Focus on problem-awareness hooks. Show the pain point in the first 3 seconds, then present your solution.' },
            local: { title: '📍 Local Tip', text: 'Use geo-targeting as your ONLY restriction. Let creative angles attract the right local customers naturally.' },
            agency: { title: '🏢 Agency Tip', text: 'Lead with results and case studies. Social proof creatives outperform feature-based ads under Andromeda.' },
            info: { title: '📚 Info Tip', text: 'Transformation stories win. Show the journey from problem to result — Andromeda matches these to aspirational buyers.' }
        };

        return [...commonTips, typeTips[type]].map(t => `
            <div class="tip-card">
                <h5>${t.title}</h5>
                <p>${t.text}</p>
            </div>
        `).join('');
    }

    // ===== Creative Concept Generator =====
    document.getElementById('generateCreatives').addEventListener('click', () => {
        const product = document.getElementById('productName').value || 'your product';
        const customer = document.getElementById('targetCustomer').value || 'your target audience';
        const benefit = document.getElementById('keyBenefit').value || 'the key benefit';
        const price = document.getElementById('pricePoint').value || 'competitive price';

        const concepts = [
            {
                format: 'video', badge: 'Short Video', badgeClass: 'badge-video',
                title: 'The "Problem Agitation" Reel',
                hook: `"Still dealing with [problem]? Here's what changed everything..."`,
                desc: `Open with a relatable frustration your ${customer} face. Build the pain for 3 seconds, then reveal ${product} as the solution. End with a clear CTA.`,
                angle: 'Problem → Solution'
            },
            {
                format: 'carousel', badge: 'Carousel', badgeClass: 'badge-carousel',
                title: 'The "Before vs After" Carousel',
                hook: `Slide 1: "What life looks like WITHOUT ${product}" vs "WITH it"`,
                desc: `5-slide carousel showing the transformation. Each slide contrasts a specific pain point with how ${benefit} solves it. Final slide: price + CTA.`,
                angle: 'Transformation / Visual Contrast'
            },
            {
                format: 'ugc', badge: 'UGC Style', badgeClass: 'badge-ugc',
                title: 'The "Authentic Unboxing" Story',
                hook: `"Okay so I just got this and I need to talk about it..."`,
                desc: `Raw, phone-shot unboxing style. A real person (or creator) discovering ${product} for the first time. Genuine reactions to ${benefit}. No polish, just real.`,
                angle: 'Social Proof / UGC'
            },
            {
                format: 'static', badge: 'Static Image', badgeClass: 'badge-static',
                title: 'The "Bold Claim" Static',
                hook: `"[Statistic] of ${customer} switch after trying ${product}"`,
                desc: `Clean, bold typography on a striking background. Lead with a powerful data point or claim about ${benefit}. Minimal design, maximum impact.`,
                angle: 'Data-Driven Authority'
            },
            {
                format: 'reel', badge: 'Reel', badgeClass: 'badge-reel',
                title: 'The "Day in the Life" POV',
                hook: `"POV: You finally discovered ${product}..."`,
                desc: `Trending Reel format showing a day in the life of someone who uses ${product}. Show the lifestyle outcome, not just the product. Aspirational yet relatable.`,
                angle: 'Lifestyle / Aspiration'
            },
            {
                format: 'video', badge: 'Video Ad', badgeClass: 'badge-video',
                title: 'The "Us vs Them" Comparison',
                hook: `"We compared ${product} against the top 3 alternatives..."`,
                desc: `Side-by-side comparison showing why ${benefit} makes ${product} stand out. Be specific with comparisons. Show don't tell. End with the price advantage at ${price}.`,
                angle: 'Comparison / Competitive'
            },
            {
                format: 'carousel', badge: 'Carousel', badgeClass: 'badge-carousel',
                title: 'The "5 Reasons" Educational',
                hook: `"5 reasons ${customer} are switching to ${product}"`,
                desc: `Educational carousel. Each slide = one compelling reason backed by ${benefit}. Mix stats, quotes, and visuals. Positions you as the informed choice.`,
                angle: 'Educational / How-To'
            },
            {
                format: 'ugc', badge: 'UGC Testimonial', badgeClass: 'badge-ugc',
                title: 'The "Real Customer Story"',
                hook: `"I was skeptical, but after 30 days with ${product}..."`,
                desc: `Phone-filmed testimonial from a real customer talking about their experience. Focus on the emotional journey — skepticism to conversion. Raw and authentic.`,
                angle: 'Emotional Testimonial'
            },
            {
                format: 'reel', badge: 'Trending Reel', badgeClass: 'badge-reel',
                title: 'The "Pattern Interrupt" Hook',
                hook: `"STOP scrolling if you're a ${customer}!"`,
                desc: `Start with a bold, attention-grabbing pattern interrupt. Quick cuts, fast pacing. Reveal the key benefit of ${product} within 5 seconds. Optimized for thumb-stopping.`,
                angle: 'Direct Response / Urgency'
            },
            {
                format: 'static', badge: 'Static + Copy', badgeClass: 'badge-static',
                title: 'The "Social Proof Stack"',
                hook: `"★★★★★ — Here's why 1000+ ${customer} chose us"`,
                desc: `Grid of real reviews/ratings with your product centered. Stack multiple proof points: star rating, review count, notable customer logos. Price point: ${price}. Clean and trustworthy.`,
                angle: 'Social Proof / Trust'
            }
        ];

        const grid = document.getElementById('conceptsGrid');
        grid.innerHTML = concepts.map((c, i) => `
            <div class="concept-card">
                <span class="concept-number">${i + 1}</span>
                <span class="concept-badge ${c.badgeClass}">${c.badge}</span>
                <h4>${c.title}</h4>
                <div class="concept-hook">🎣 Hook: ${c.hook}</div>
                <p class="concept-desc">${c.desc}</p>
                <p class="concept-angle">Angle: ${c.angle}</p>
            </div>
        `).join('');
        grid.style.display = 'grid';
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ===== Scaling Calculator =====
    document.getElementById('calculateScale').addEventListener('click', () => {
        const current = parseFloat(document.getElementById('currentBudget').value) || 50;
        const target = parseFloat(document.getElementById('targetBudget').value) || 500;
        const rate = parseFloat(document.getElementById('scaleRate').value) || 0.20;
        const freq = parseInt(document.getElementById('scaleFreq').value) || 3;

        if (target <= current) {
            alert('Target budget must be higher than current budget!');
            return;
        }

        const steps = [];
        let budget = current;
        let day = 0;
        let cumulative = 0;

        steps.push({ step: 0, day: 0, budget: current, increase: 0, cumulative: current * freq });
        cumulative = current * freq;

        while (budget < target) {
            const increase = budget * rate;
            budget = Math.min(budget + increase, target);
            day += freq;
            cumulative += budget * freq;
            steps.push({
                step: steps.length,
                day,
                budget: Math.round(budget * 100) / 100,
                increase: Math.round(increase * 100) / 100,
                cumulative: Math.round(cumulative)
            });
        }

        const totalDays = steps[steps.length - 1].day;
        const totalSpend = Math.round(cumulative);

        // Summary
        document.getElementById('scalingSummary').innerHTML = `
            <div class="summary-card">
                <span class="summary-value">${steps.length - 1}</span>
                <span class="summary-label">Scale Steps</span>
            </div>
            <div class="summary-card">
                <span class="summary-value">${totalDays} days</span>
                <span class="summary-label">Time to Target</span>
            </div>
            <div class="summary-card">
                <span class="summary-value">$${current} → $${target}</span>
                <span class="summary-label">Budget Journey</span>
            </div>
            <div class="summary-card">
                <span class="summary-value">$${totalSpend.toLocaleString()}</span>
                <span class="summary-label">Est. Total Spend</span>
            </div>
        `;

        // Table
        document.getElementById('scalingBody').innerHTML = steps.map(s => `
            <tr>
                <td>${s.step === 0 ? 'Start' : s.step}</td>
                <td>Day ${s.day}</td>
                <td><strong>$${s.budget.toFixed(2)}</strong></td>
                <td style="color: ${s.increase > 0 ? 'var(--accent-green)' : 'var(--text-muted)'}">
                    ${s.increase > 0 ? '+$' + s.increase.toFixed(2) : '—'}
                </td>
                <td>$${s.cumulative.toLocaleString()}</td>
            </tr>
        `).join('');

        document.getElementById('scalingOutput').style.display = 'block';
        document.getElementById('scalingOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ===== Readiness Checklist =====
    const readinessChecks = document.querySelectorAll('.readiness-check');
    const checklistProgress = document.getElementById('checklistProgress');
    const checklistCount = document.getElementById('checklistCount');

    readinessChecks.forEach(check => {
        check.addEventListener('change', () => {
            const total = readinessChecks.length;
            const checked = document.querySelectorAll('.readiness-check:checked').length;
            const pct = (checked / total) * 100;
            checklistProgress.style.width = `${pct}%`;
            checklistProgress.style.background = pct >= 80 ? 'var(--gradient-3)' : pct >= 50 ? 'var(--gradient-1)' : 'var(--gradient-2)';
            checklistCount.textContent = `${checked} / ${total} complete`;
        });
    });
});

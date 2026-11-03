window.portfolio = {
  "projects": [
    {
      "id": "touchdesigner",
      "number": "01",
      "category": "AI AGENTS / CREATIVE TOOLS",
      "title": "TouchDesigner Harness Agent",
      "subtitle": "Natural language to real-time visuals: a TouchDesigner agent with node/script routing, context-aware generation, and validation feedback.",
      "date": "2026.03 — Present",
      "role": "Personal project",
      "description": "A prototype agent for building TouchDesigner node networks and Python scripts from natural-language requests. A router selects the generation strategy, assembles prompts with domain knowledge and memory, and passes model output to a network builder. A harness combines static validation, runtime checks, and screenshot-based visual review, with optional repair and refinement.",
      "contribution": "Designed the routing, context assembly, network-building, and validation workflow, with domain RAG, session context, and persistent learned memory. The prototype also includes a separate preset interaction path for demonstrating the interface and generated visual output.",
      "tags": [
        "TouchDesigner",
        "Python",
        "RAG",
        "Agent Harness",
        "Vision API"
      ],
      "flow": [
        "Request · node/script routing",
        "RAG + memory · prompt assembly",
        "LLM API · network builder",
        "Harness · checks and optional repair"
      ],
      "caption": "Model-backed generation workflow",
      "video": "media/td-agent-demo.mp4",
      "paper": null,
      "image": "media/td-agent-cover.png",
      "imageAlt": "TouchDesigner Harness Agent cover: Natural language to real-time visuals.",
      "technicalDetails": [
        {
          "title": "Routing and context",
          "text": "Requests are routed to node-network or Python-script generation. Prompt assembly combines operator documentation, pipeline examples, session context, and learned patterns; Chroma recall is optional."
        },
        {
          "title": "Build, validate, refine",
          "text": "The network builder converts node JSON or Python output into a TouchDesigner network. Static checks precede construction; runtime checks and screenshot-based visual review provide feedback for optional repair rounds."
        },
        {
          "title": "Two execution paths",
          "text": "Normal mode uses the LLM, RAG, and memory. Sample mode runs a preset mouse-fireworks prototype with a timed loading transition; it accepts any nonempty prompt and does not call the LLM or RAG. The sample demonstrates interaction rather than open-ended generation."
        },
        {
          "title": "Observability and testing status",
          "text": "Execution logs, session summaries, and harness reports expose intermediate state and validation results. Interaction Test MCP is a separate tool: its mock adapter is ready, while the live TouchDesigner adapter is pending."
        }
      ],
      "gallery": [
        {
          "src": "media/td-agent-architecture.png",
          "title": "Agent architecture",
          "alt": "TouchDesigner agent architecture from user request through routing, prompt assembly, LLM, network builder, and validation, with RAG and memory inputs.",
          "caption": "The generation architecture and feedback loop. The separate interaction-testing adapter is marked as pending for live TouchDesigner use."
        },
        {
          "src": "media/td-agent-network-map.svg",
          "title": "TouchDesigner network map",
          "alt": "Network map separating the normal model-backed agent path from the preset sample fireworks path, with logs and validation reports.",
          "caption": "The llm_node_gen controller switches between normal generation and the sample prototype. The map documents each path and its observability nodes."
        }
      ]
    },
    {
      "id": "astrovis",
      "number": "02",
      "category": "SCIENTIFIC VISUALIZATION / WEB SYSTEMS",
      "title": "AstroVis",
      "subtitle": "Explore large star catalogs in the browser with cloud octrees, view-dependent streaming, and memory-aware WebGL rendering.",
      "date": "2024.07 — 2025.06",
      "role": "Team project · Fourth author",
      "description": "AstroVis turns large astronomical catalogs into a portable browser experience. A server preprocesses an uploaded dataset into a reusable cloud octree; the browser retrieves lightweight metadata and progressively streams visible leaf chunks. Users can orbit, pan, and zoom through star fields without downloading the entire source catalog. The same visibility, fetching, and caching approach also supports multi-resolution globe browsing.",
      "contribution": "Worked on the Vue/Vite interface, chunked streaming and dynamic deserialization, bounded caching, and Octree-based loading to support interactive exploration.",
      "tags": [
        "Vue / Vite",
        "Three.js / WebGL",
        "Octree",
        "Cloud streaming"
      ],
      "flow": [
        "Upload catalog · cloud octree",
        "Metadata · visible-leaf traversal",
        "Async streaming · bounded cache",
        "Progressive WebGL rendering"
      ],
      "caption": "Upload once, explore on demand — system workflow summarized from the paper.",
      "video": "",
      "paper": 1,
      "image": "media/astrovis-cover.png",
      "imageAlt": "AstroVis conceptual cover illustrating stellar point clouds, octree partitions, and cloud-to-browser streaming.",
      "imageCaption": "Conceptual project cover; actual system diagrams and rendering results are reproduced below from the paper.",
      "technicalDetails": [
        {
          "title": "Upload once, explore across sessions",
          "text": "The backend converts an uploaded catalog into an octree and returns a reusable dataset ID. The browser reconstructs the hierarchy from metadata, then requests data for the current view rather than the entire catalog.",
          "figure": 0
        },
        {
          "title": "Why an octree has eight children",
          "text": "An octree divides a three-dimensional region in half along each of its x, y, and z axes, producing 2 × 2 × 2 = 8 child regions. Subdivision repeats where the point count exceeds the node capacity. In AstroVis, axis-aligned bounding boxes make it inexpensive to test which regions intersect the camera view and request only the relevant leaf data.",
          "figure": 3
        },
        {
          "title": "Predictable chunks, lightweight decoding",
          "text": "A capacity of 15,000 points per node controls subdivision. Data-bearing leaves are stored as binary files named by node index, alongside meta.json. Position and photometric attributes can be decoded using JavaScript typed arrays.",
          "figure": 1
        },
        {
          "title": "Streaming and cache lifecycle",
          "text": "Frustum tests select visible leaves; a FIFO queue limits concurrent requests and drops leaves that become invisible before dispatch. GPU buffers are released when a leaf leaves the view, while decoded CPU data is retained briefly for revisits. A memory cap and delayed eviction manage browser resource use."
        },
        {
          "title": "Attribute-driven star-field rendering",
          "text": "Three.js/WebGL renders stars as camera-facing billboards. B–V color index controls color, while magnitude contributes to luminosity and size. Newly arrived leaves update GPU buffers incrementally, allowing the scene to refine during navigation.",
          "figure": 2
        },
        {
          "title": "What the paper measured",
          "text": "The team evaluated a 3-million-star Gaia DR2 subset (1.1 GB) and a 700,000-star LAMOST subset (500 MB) over a 10 Mb/s Shanghai–New York link on Intel UHD Graphics. Reported frame times were 14.29–18.18 ms, with 123–560 MB memory usage across the tested views and a 60-second eviction timeout. These are study-specific system results, not universal performance guarantees."
        },
        {
          "title": "Trade-offs",
          "text": "Preprocessing is a one-time cost, but frequent dataset updates remain a limitation. Long-distance transfers can produce visible pop-in, and dense regions still stress the GPU. Predictive prefetching and richer linked analytics are future directions rather than completed features."
        }
      ],
      "gallery": [
        {
          "src": "media/astrovis-figure-1.png",
          "title": "Figure 1 · System architecture",
          "alt": "Original AstroVis paper Figure 1 showing upload, octree preprocessing, metadata retrieval, and visible-node rendering.",
          "caption": "Cloud preprocessing and browser-side visualization. Source: Jiang et al., AstroVis, Figure 1.",
          "source": "https://doi.org/10.1109/PacificVis68791.2026.00032"
        },
        {
          "src": "media/astrovis-figure-3.png",
          "title": "Figure 3 · Octree serialization",
          "alt": "Original AstroVis paper Figure 3 showing octree leaf nodes serialized to indexed files and meta.json.",
          "caption": "Leaf payloads and metadata are stored separately. Source: Jiang et al., AstroVis, Figure 3.",
          "source": "https://doi.org/10.1109/PacificVis68791.2026.00032"
        },
        {
          "src": "media/astrovis-figure-4.png",
          "title": "Figure 4 · Progressive rendering",
          "alt": "Original paper overview and zoomed-in views of Gaia DR2 and LAMOST star catalogs.",
          "caption": "Gaia DR2 (a–b) and LAMOST (c–d). Source: Jiang et al., AstroVis, Figure 4.",
          "source": "https://doi.org/10.1109/PacificVis68791.2026.00032"
        },
        {
          "src": "media/astrovis-figure-2.png",
          "title": "Figure 2 · Eight-way spatial subdivision",
          "alt": "A three-dimensional cube split into eight child octants, labeled 0 to 7, from the AstroVis paper.",
          "caption": "Each subdivision creates eight child regions. Labels 0–7 identify their relative positions. Source: Jiang et al., AstroVis, Figure 2.",
          "source": "https://doi.org/10.1109/PacificVis68791.2026.00032"
        }
      ]
    },
    {
      "id": "stellar",
      "number": "03",
      "category": "VISUAL ANALYTICS / MACHINE LEARNING",
      "title": "Finding stellar substructures",
      "subtitle": "Select stars in a projection and find them in 3D to test which ones belong to a cluster.",
      "date": "2024.10 — 2025.03",
      "role": "Independent research · First author",
      "description": "Stars that look close together on the sky can have different motions. Across 85 nearby open clusters and more than 20,000 stellar observations, the study links position, motion and photometry so that researchers can check a candidate group from several angles.",
      "contribution": "Built the frontend and backend with Vue and Flask, connecting data processing and REST APIs to linked visualizations, queries, and analysis feedback.",
      "tags": [
        "Python / Flask",
        "Vue",
        "StarGO",
        "Linked views"
      ],
      "flow": [
        "High-dimensional data",
        "Reduction · clustering",
        "Linked visual views",
        "Explore · adjust parameters"
      ],
      "caption": "Analysis workflow · algorithm results made explorable",
      "video": "",
      "paper": 0,
      "image": "media/stellar-fig-6.png",
      "imageAlt": "Stellar masses shown in color across a star cluster",
      "imageCaption": "Figure 6 from the paper. Lower-mass stars appear blue around the outskirts, while higher-mass stars concentrate near the center.",
      "technicalDetails": [
        {
          "title": "Follow one selection across views",
          "text": "Select a group in the projection, then inspect the same stars in 3D and on parallel coordinates. The Max-Tree lets researchers move from a parent group to smaller subgroups and compare their velocities.",
          "figure": 0
        },
        {
          "title": "Separate Platais 8 from the field",
          "text": "The initial point cloud hides the cluster among background stars. Coloring the points by catalog label and narrowing the ranges on parallel coordinates isolates the candidate members.",
          "figure": 1
        },
        {
          "title": "Check whether the candidates form a core",
          "text": "Selecting one group at the edge of the projection reveals a compact core in 3D. Another selection picks out widely scattered stars, suggesting possible outliers or a loosely associated halo.",
          "figure": 2
        }
      ],
      "gallery": [
        {
          "src": "media/stellar-fig-3.png",
          "alt": "Selections and filters propagate between the linked views.",
          "title": "Figure 3",
          "caption": "Selections and filters propagate between the linked views.",
          "source": "https://doi.org/10.1109/ICCBDAI66607.2025.11388769"
        },
        {
          "src": "media/stellar-fig-4.png",
          "alt": "Platais 8 before labeling, after coloring by label, and after filtering.",
          "title": "Figure 4",
          "caption": "Platais 8 before labeling, after coloring by label, and after filtering.",
          "source": "https://doi.org/10.1109/ICCBDAI66607.2025.11388769"
        },
        {
          "src": "media/stellar-fig-5.png",
          "alt": "Two selections in the projection produce different spatial patterns.",
          "title": "Figure 5",
          "caption": "Two selections in the projection produce different spatial patterns.",
          "source": "https://doi.org/10.1109/ICCBDAI66607.2025.11388769"
        }
      ]
    },
    {
      "id": "fast",
      "number": "04",
      "category": "RADIO ASTRONOMY / INTERACTIVE VISUALIZATION",
      "title": "FAST · Radio Astronomy",
      "subtitle": "An interactive journey from cosmic signals to astronomical data, powered by Three.js particles, custom GLSL shaders, and Vue + ECharts analysis views.",
      "date": "",
      "role": "Interactive visualization project",
      "description": "Inspired by FAST radio astronomy, this interactive website guides visitors from discovery to understanding and analysis. A flowing particle galaxy transforms into pulsars, hydrogen clouds, and fast radio burst scenes, connecting visual storytelling with dedicated observation tools. Built with Three.js and custom GLSL shaders, the experience combines responsive particles and seamless spatial transitions with Vue and ECharts analysis pages, making complex astronomical concepts more approachable.",
      "contribution": "Frontend development and scientific visualization: interactive interfaces and reusable data-display components that help visitors explore astronomical signals through visual storytelling and analysis.",
      "tags": [
        "Three.js",
        "GLSL",
        "Vue",
        "Visualization"
      ],
      "flow": [
        "Particle galaxy · discovery",
        "Pulsars · hydrogen · fast radio bursts",
        "Responsive particles · spatial transitions",
        "Vue + ECharts · data analysis"
      ],
      "caption": "From immersive discovery to astronomical analysis",
      "image": "media/fast-radio-astronomy.png",
      "imageAlt": "FAST-inspired website with a blue particle galaxy and entry points for pulsars, neutral hydrogen, fast radio bursts, and cosmic horizons.",
      "video": "media/fast-demo.mp4",
      "paper": null,
      "technicalDetails": [
        {
          "title": "Three.js + custom GLSL",
          "text": "A responsive particle galaxy transforms into scenes representing pulsars, hydrogen clouds, and fast radio bursts."
        },
        {
          "title": "Spatial transitions",
          "text": "Seamless transitions connect the galaxy overview with individual astronomical scenes, guiding visitors from discovery to understanding."
        },
        {
          "title": "Vue + ECharts",
          "text": "Dedicated observation and analysis pages connect the visual journey with astronomical data and interactive charts."
        }
      ]
    }
  ],
  "papers": [
    {
      "title": "Interactive Visual Analytics for High-Dimensional Stellar Substructure Identification",
      "venue": "IEEE ICCBD+AI",
      "year": "2025",
      "author": "First author",
      "url": "https://doi.org/10.1109/ICCBDAI66607.2025.11388769"
    },
    {
      "title": "AstroVis: A Cloud-Streaming Octree System for Web-Based Astronomical Visualization",
      "venue": "PacificVis",
      "year": "2026",
      "author": "Fourth author",
      "url": "https://doi.org/10.1109/PacificVis68791.2026.00032"
    },
    {
      "title": "Exploring Cultural Heritage with AR: The TAM Case Study of Nvshu",
      "venue": "CASA",
      "year": "2025",
      "author": "Co-first author",
      "url": "https://link.springer.com/chapter/10.1007/978-981-95-0100-7_3"
    },
    {
      "title": "Galactic Wandering: An Immersive Tour of the Solar System",
      "venue": "CSECS",
      "year": "2025",
      "author": "Third author",
      "url": "https://doi.org/10.1109/CSECS64665.2025.11009317"
    },
    {
      "title": "Astronomical Data Visualization Based on OpenSpace",
      "venue": "ChinaVis",
      "year": "2023",
      "author": "First author · Poster",
      "url": "https://chinavis.org/2023/poster.html"
    }
  ]
};

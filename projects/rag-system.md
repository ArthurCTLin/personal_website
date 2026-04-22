# RAG-Engine Toolkit

> **Product Positioning:** A high-reliability, "full-context aware" retrieval solution designed for complex documentation.

This toolkit serves as a fundamental core for enterprise-level RAG applications. It addresses the critical pain points of traditional **Naive RAG**, such as the inability to handle long-form context, loss of fine-grained details, and parsing failures in complex layouts. By integrating **Ultra-Fine-Grained Indexing** with **Semantic Structural Navigation**, we provide developers with a retrieval engine featuring high-availability redundancy.


## Core Architecture: Dual-Track Aligned Indexing

Instead of a single retrieval path, this toolkit dissects documents into two complementary dimensions to ensure both precision and context.

### 1. Structural Navigation Track (Powered by MinerU)
* **Technical Highlight:** Utilizes deep learning for **Layout Analysis** to identify document hierarchies (Sections/Subsections).
* **Function:** Establishes a **"Vertical Index"**. It empowers the system with "Global Cognition," automatically generating chapter summaries and providing full background context during retrieval.
* **Advantage:** Eliminates "out-of-context" issues, ensuring LLM responses follow the logical sequence of the original document.

### 2. Atomic Retrieval Track (Recursive Chunking)
* **Technical Highlight:** Implements ultra-fine-grained text splitting (300-500 tokens).
* **Function:** Establishes a **"Horizontal Index"**. It focuses on precise matching of minute data points, technical specifications, or specific terminology.
* **High-Availability Fallback Mechanism:**
    * **Scenario:** When structural parsing (MinerU) fails due to cluttered formatting or low-quality scans.
    * **Mechanism:** The system automatically switches to the Atomic layer, ensuring **100% of raw text is indexed**, providing a commercial-grade promise of **"Zero-Loss Retrieval"**.


## Key Module: Hybrid Graph-RAG & Adaptive Paths

The toolkit features multi-layered retrieval logic, allowing developers to combine paths based on specific use cases using **Neo4j** as the graph backbone:

* **Horizontal Expansion (Entity-based):** Connects identical entities (e.g., same equipment model, same expert) via knowledge graphs to achieve "cross-page, cross-document" knowledge jumping.
* **Vertical Navigation (Structure-based):** Utilizes parent-child relationships (*Child Chunk -> Belongs to -> Section*) to achieve **"Search Small, Read Large"** precision.
* **Adaptive Re-ranking:**
    1.  Simultaneously triggers multiple retrieval paths.
    2.  Built-in **Re-ranker** engine performs de-duplication and refinement.
    3.  Filters out redundant info to feed only high-value knowledge snippets to the LLM.


<img src="/graphs/rag_system/RAG_Architecture.png" style="width: 100%; border-radius: 8px" />
<p style="text-align: center; color: #888; font-size: 0.85em;">RAG Architecture.png.</p>


## Why Choose This Toolkit?

> [!IMPORTANT] info High Availability
Double protection through structural parsing and atomic chunking eliminates parsing blind spots common in legacy PDF parsers.


> [!TIP] Ultra-Low Hallucination Rate
Chapter-weighting and entity cross-referencing force the LLM to answer within the correct semantic context, significantly reducing hallucination.


* **Modular Design:** Easily integrates into existing CRM, ERP, or educational platforms.
* **Complex Document Adaptability:** From rigorous textbooks to inconsistently formatted security reports, it delivers stable retrieval quality.


## Future Expansion: Adaptive Retrieval Dispatcher

We are currently developing a dynamic evaluation mechanism where the system automatically assesses the **"Granularity Level"** of a query:

* **Summarization/Broad Queries** $\rightarrow$ Automatically increases the weight of the **Vertical Structural Path**.
* **Specific Values/Technical Terms** $\rightarrow$ Automatically switches to **Atomic Horizontal Search**.

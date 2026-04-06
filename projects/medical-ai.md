# Medical AI

> Not just train models; architect end-to-end solutions. When SOTA models hit clinical bottlenecks, I bridge the gap with custom geometric algorithms to ensure reliability and generalization.


## Case 1: 360° Hip OA Morphometry Pipeline
**"Transitioning from discrete 3-point sampling to global geometric analysis"**

### Stage 1: The Segmentation Baseline
In medical imaging, achieving perfect segmentation is rarely the end goal—it is the foundation. First stage uses **UNet with an EfficientNet-B7 backbone** to define the anatomical structures.

<img src="/graphs/OA/segmentation_dices.png" style="width: 100%; border-radius: 8px" />
<p style="text-align: center; color: #888; font-size: 0.85em;">Detailed 5-Fold performance tracking for Stage 1 Segmentation.</p>

<img src="/graphs/OA/segmentation_demo.png" style="width: 100%; border-radius: 8px" />
<p style="text-align: center; color: #888; font-size: 0.85em;">Segmentation Result.</p>


**Engineering Strategy:**
While Femoral Head segmentation is stable (0.929 Dice), the Acetabular Fossa (0.739 Dice) presents a natural bottleneck due to its complex morphology and labeling inconsistency. Instead of "over-engineering" the model for marginal gains, I optimized the downstream logic.

---

### Traditional Method: Discrete 3-Point Measurement
Clinically, Hip OA is often diagnosed when the joint space narrowing is < 0.2 cm (2mm). Traditional automation attempts to replicate this by detecting three discrete points (Lateral, Superior, Medial).

* **The Problem**: At a Dice score of 0.739 (Acetabular Fossa), the predicted boundaries exhibit minor local pixel-level jitters.
* **The Failure of Points**: Relying on three discrete "feature points" is extremely fragile; a 2-pixel shift in the boundary can lead to a 20% error in joint-space measurement, making it unusable for clinical diagnosis.

<div style="display: flex; gap: 15px; margin: 20px 0;">
  <div style="flex: 1; text-align: center;">
    <img src="/graphs/OA/trandition_good.png" style="border-radius: 8px;" />
    <p style="font-size: 0.8em; color: #3eaf7c; font-weight: bold;">Case of capturing 3 points well.</p>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/graphs/OA/trandition_bad.png" style="border-radius: 8px;" />
    <p style="font-size: 0.8em; color: #f66; font-weight: bold;">Unstable point-detection in variant case.</p>
  </div>
</div>



<div style="display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <img src="/graphs/OA/trandition_cm.png" style="width: 100%; border-radius: 8px" />
    <p style="text-align: center; font-size: 0.85em; color: #888; margin-top: 8px;">
      Confusion Matrix (Traditional 3-Point)
    </p>
  </div>

  <div style="flex: 1.2; min-width: 320px;">
    <table style="width: 100%; font-size: 0.95em;">
      <thead>
        <tr>
          <th>Category</th>
          <th>Precision</th>
          <th>Recall</th>
          <th>F1 Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Overall</td>
          <td>0.641</td>
          <td>0.550</td>
          <td>0.492</td>
        </tr>
        <tr>
          <td>Non-Symptomatic</td>
          <td>0.558</td>
          <td>0.980</td>
          <td>0.711</td>
        </tr>
        <tr style="background: rgba(246, 102, 102, 0.15); border-left: 4px solid #f66;">
          <td><strong>Symptomatic OA</strong></td>
          <td>0.625</td>
          <td>0.048</td>
          <td><strong style="color: #f66;">0.090</strong></td>
        </tr>
        <tr>
          <td>Undetermined</td>
          <td>0.739</td>
          <td>0.622</td>
          <td>0.676</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 0.85em; color: #888; line-height: 1.5; margin-top: 10px;">
      <b>Engineering Insight:</b> The extremely low <b>F1 Score (0.090)</b> for symptomatic patients stems from the fragile nature of point-based measurements. This catastrophic sensitivity failure necessitated our transition to a <b>Global Geometric Sweep</b>.
    </p>
  </div>

</div>

---

### ⚙️ Stage 2: 360° Radial Contour Scanning
To overcome the instability of point-based methods, I developed a custom geometric sweep algorithm.

* **Global Information**: Instead of three points, the algorithm performs a 360° sweep (1° resolution) from the geometric center of the femoral head.
* **Error Resilience**: By analyzing the **entire contour**, the system effectively "smooths out" local segmentation noise from Stage 1. 
* **Clinical Output**: Generates a continuous **Distance Distribution Curve**, allowing MDs to pinpoint the exact angle of maximum joint space narrowing—a level of detail impossible with manual methods.


<img src="/graphs/OA/scan_demo.png" style="width: 100%; border-radius: 8px" />
<p style="text-align: center; color: #888; font-size: 0.85em;">Solution: 360° Radial Scan (Geometric Robustness).</p>

<div style="display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <img src="/graphs/OA/scan_cm.png" style="width: 100%; border-radius: 8px" />
    <p style="text-align: center; font-size: 0.85em; color: #888; margin-top: 8px;">
      Confusion Matrix (Traditional 3-Point)
    </p>
  </div>

  <div style="flex: 1.2; min-width: 320px;">
    <table style="width: 100%; font-size: 0.95em;">
      <thead>
        <tr>
          <th>Category</th>
          <th>Precision</th>
          <th>Recall</th>
          <th>F1 Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Overall</td>
          <td>0.807</td>
          <td>0.777</td>
          <td>0.791</td>
        </tr>
        <tr>
          <td>Non-Symptomatic</td>
          <td>0.871</td>
          <td>0.904</td>
          <td>0.887</td>
        </tr>
        <tr style="background: rgba(246, 102, 102, 0.15); border-left: 4px solid #f66;">
          <td><strong>Symptomatic OA</strong></td>
          <td>0.812</td>
          <td>0.807</td>
          <td>0.809</td>
        </tr>
        <tr>
          <td>Undetermined</td>
          <td>0.739</td>
          <td>0.622</td>
          <td>0.676</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 0.85em; color: #888; line-height: 1.5; margin-top: 10px;">
      <b> Better Performance with 360° Radial Scan (Geometric Robustness)</b>.
    </p>
  </div>

</div>

---

## Case 2: Endplate Recognition

### Object Detection
### Statistical Integrity
Beyond Dice scores, I emphasize **statistical stability**. For tasks like Endplate Recognition, I implemented the **Bootstrap Method** to calculate **95% Confidence Intervals (CI)**, ensuring our performance metrics are not just "lucky splits" but statistically sound clinical evidence.

### Project Portfolio Matrix
| Category | Task | Strategy | Metrics |
| :--- | :--- | :--- | :--- |
| **Fracture** | Femoral Neck Fx | 2-Stage: ROI Crop + 3-Class Cls | **AUC 0.960** |
| **Detection** | Pars Fracture | Small-target CT segmentation | **F1 0.857** |
| **Prediction** | Pseudoarthrosis | Feature Eng + Robust OOF Val | **AUC 0.916** |
| **Synthesis** | Liver Tumor | GAN-based Augmentation | **Dice 0.82** |

---

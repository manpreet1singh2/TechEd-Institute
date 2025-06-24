const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600">We offer a unique learning experience that sets you up for success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Expert Instructors</h3>
            <p className="text-gray-500">Learn from industry professionals with years of experience.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Hands-On Projects</h3>
            <p className="text-gray-500">Gain practical experience through real-world projects.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Career Support</h3>
            <p className="text-gray-500">Get personalized career guidance and placement assistance.</p>
          </div>
        </div>
      </div>

      {/* Add this new Statistics Counter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Success in Numbers</h2>
            <p className="text-xl text-blue-100">Proven track record of excellence in education</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 counter" data-target="15000">
                0
              </div>
              <div className="text-lg font-semibold">Students Trained</div>
              <div className="text-blue-200 text-sm">Since 2018</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2 counter" data-target="92">
                0
              </div>
              <div className="text-lg font-semibold">Placement Rate %</div>
              <div className="text-blue-200 text-sm">Industry Average</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2 counter" data-target="11">
                0
              </div>
              <div className="text-lg font-semibold">Professional Courses</div>
              <div className="text-blue-200 text-sm">Industry Focused</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2 counter" data-target="50">
                0
              </div>
              <div className="text-lg font-semibold">Expert Instructors</div>
              <div className="text-blue-200 text-sm">Industry Veterans</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 counter" data-target="6">
                0
              </div>
              <div className="text-lg font-semibold">Years of Excellence</div>
              <div className="text-blue-200 text-sm">Established 2018</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2 counter" data-target="500">
                0
              </div>
              <div className="text-lg font-semibold">Companies Hiring</div>
              <div className="text-blue-200 text-sm">Our Alumni</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2 counter" data-target="98">
                0
              </div>
              <div className="text-lg font-semibold">Student Satisfaction %</div>
              <div className="text-blue-200 text-sm">Based on Reviews</div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default WhyChooseUs
